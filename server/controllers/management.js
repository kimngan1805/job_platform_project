import mongoose from 'mongoose';
import User from "../models/User.js"; // Giữ nguyên
import Company from '../models/Company.js'; // Import model Company
import JobPosting from '../models/JobPosting.js'; // <--- ĐẢM BẢO DÒNG NÀY CÓ MẶT
import bcrypt from "bcrypt";

/* --- JOB POST MANAGEMENT FUNCTIONS --- */

// Hàm lấy danh sách bài đăng (có phân trang, lọc, tìm kiếm)
export const getJobPosts = async (req, res) => {
    try {
        // 1. Lấy tham số 'status' từ query params
        const { page = 0, pageSize = 20, sort = null, search = "", status = "" } = req.query; 

        // Xử lý logic Sorting (giữ nguyên)
        const generateSort = () => {
            const sortParsed = sort ? JSON.parse(sort) : {};
            const sortFormatted = {};
            if (Object.keys(sortParsed).length) {
                const { field, sort: sortValue } = sortParsed;
                sortFormatted[field] = sortValue === "asc" ? 1 : -1;
            }
            return sortFormatted;
        };
        const sortFormatted = generateSort();

        // 2. Xây dựng điều kiện tìm kiếm và lọc
        const baseQuery = {}; // Khởi tạo điều kiện truy vấn

        // Lọc theo từ khóa tìm kiếm (title, industry)
        if (search) {
             baseQuery.$or = [
                { title: { $regex: new RegExp(search, "i") } },
                { industry: { $regex: new RegExp(search, "i") } },
            ];
        }

        // 3. LỌC THEO TRẠNG THÁI (Nếu status không phải "all" hoặc rỗng)
        if (status && status !== "all") {
             baseQuery.status = status; 
        }

        // Count tổng số tài liệu (cho pagination)
        const total = await JobPosting.countDocuments(baseQuery); 

        // Lấy dữ liệu Job Posts, sử dụng baseQuery đã lọc
        const jobPosts = await JobPosting.find(baseQuery)
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize)
            .populate({
                path: 'companyRef',
                model: 'Company',
                select: 'name email status',
            });

        res.status(200).json({
            jobPosts,
            total,
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// Hàm cập nhật trạng thái bài đăng (Duyệt/Từ chối/Xóa mềm/Đóng)
export const updateJobPostStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body; // status: 'approved', 'rejected', 'closed', 'pending'
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ message: `ID bài đăng không hợp lệ: ${id}` });
        }

        let updateFields = { status };
        
        // Thêm lý do nếu bị từ chối
        if (status === 'rejected' && reason) {
            updateFields.rejectionReason = reason;
        } else {
            updateFields.rejectionReason = null;
        }

        const updatedPost = await JobPosting.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng.' });
        }

        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hàm xóa bài đăng (Hard Delete - Chỉ Admin nên dùng)
export const deleteJobPost = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ message: `ID bài đăng không hợp lệ: ${id}` });
        }

        const deletedPost = await JobPosting.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để xóa.' });
        }

        res.status(200).json({ message: 'Bài đăng đã được xóa thành công.' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* --- USER MANAGEMENT FUNCTIONS (Existing) --- */

export const getUsers = async (req, res) => {
    try {
        const { search, role } = req.query;
        
        let baseQuery = {};
        
        // 1. Xây dựng Query Base (Giữ nguyên logic)
        if (role && ['admin', 'employer', 'jobseeker'].includes(role.toLowerCase())) {
            baseQuery.role = role.toLowerCase();
        }

        if (search) {
            baseQuery.$or = [
                { name: { $regex: new RegExp(search, 'i') } },
                { email: { $regex: new RegExp(search, 'i') } },
            ];
        }
        
        // 2. Thực hiện truy vấn
        const users = await User.find(baseQuery) 
            .select("-password") 
            .populate([
                {
                    path: "companyRef",
                    model: "Company",
                    select: "name isVerified", 
                },
                // Đảm bảo JobSeekerProfile đã được định nghĩa
                // {
                //     path: "profileRef",
                //     model: "JobSeekerProfile", 
                //     select: "personalInfo.fullName", 
                // },
            ]);

        // 3. Xử lý trường hợp không tìm thấy người dùng
        if (!users || users.length === 0) {
            // Gửi phản hồi và DÙNG RETURN để thoát
            return res.status(200).json([]); 
        }
        
        // 4. Gửi phản hồi thành công (DÙNG RETURN để thoát)
        return res.status(200).json(users); 

    } catch (error) {
        // Lỗi 500 nếu có lỗi server.
        // DÙNG RETURN để thoát khỏi hàm catch
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return res.status(500).json({ message: "Lỗi server nội bộ: " + error.message });
    }
};

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password'); 
        // Đảm bảo có filter { role: 'admin' }
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, status } = req.body; // Lấy các trường cần cập nhật
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID người dùng không hợp lệ." });
        }

        const updateFields = { name, email, role, status };

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true } // runValidators: Đảm bảo kiểm tra enum, required
        ).select('-password'); 

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng để cập nhật." });
        }

        // Trả về tài liệu đã cập nhật
        return res.status(200).json(updatedUser);

    } catch (error) {
        // Lỗi 409 cho lỗi trùng key unique (email)
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email đã tồn tại. Vui lòng sử dụng Email khác." });
        }
        // Lỗi validation khác (ví dụ: role không hợp lệ)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        console.error("Lỗi cập nhật người dùng:", error);
        return res.status(500).json({ message: error.message });
    }
};


/* --- COMPANY MANAGEMENT FUNCTIONS (New) --- */

export const getCompanies = async (req, res) => {
    try {
        // Lấy các tham số từ query string của URL
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // 1. Xây dựng Query cơ bản
        let baseQuery = { status: { $ne: 'Deleted' } };

        // 2. Thêm điều kiện tìm kiếm (Search)
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            baseQuery.$or = [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { description: { $regex: searchRegex } },
                { industry: { $regex: searchRegex } },
                { website: { $regex: searchRegex } },
            ];
        }

        // 3. Xây dựng logic sắp xếp (Sort)
        // Bắt đầu với sắp xếp mặc định: MỚI NHẤT HIỆN LÊN ĐẦU (createdAt: -1)
        let sortFormatted = { createdAt: -1 }; 
        
        if (sort) {
            // Nếu Client GỬI yêu cầu sắp xếp, thì ghi đè mặc định
            try {
                // Giả định sort nhận chuỗi JSON như '{"field": "desc"}'
                const parsedSort = JSON.parse(sort);
                const sortKey = Object.keys(parsedSort)[0];
                const sortValue = parsedSort[sortKey] === "asc" ? 1 : -1;
                
                // Ghi đè sắp xếp mặc định bằng yêu cầu của Client
                sortFormatted = { [sortKey]: sortValue }; 
            } catch (e) {
                console.warn("Invalid sort JSON string provided:", sort);
                // Giữ nguyên sortFormatted mặc định nếu JSON không hợp lệ
            }
        }
        
        // 4. Tính toán Phân trang
        const limit = parseInt(pageSize);
        const skip = (parseInt(page) - 1) * limit;

        // 5. Thực hiện truy vấn (Lấy dữ liệu)
        const companies = await Company.find(baseQuery)
            .sort(sortFormatted) // Sử dụng sắp xếp đã định dạng (mặc định là createdAt: -1)
            .skip(skip)
            .limit(limit);

        // 6. Lấy Tổng số tài liệu (cho Phân trang)
        const total = await Company.countDocuments(baseQuery);
        
        // 7. Trả về phản hồi
        return res.status(200).json({
            companies,
            total,
            page: parseInt(page),
            pageSize: limit,
        });

    } catch (error) {
        console.error("Lỗi khi lấy danh sách công ty:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Hàm thêm công ty mới
export const createCompany = async (req, res) => {
    // Lấy tất cả thông tin từ form của Admin
    const { 
        ownerName, 
        ownerEmail, 
        ownerPassword, 
        name, 
        description, 
        address, 
        email, 
        website, 
        industry 
    } = req.body; 

    try {
        let userOwner = await User.findOne({ email: ownerEmail });

        if (userOwner) {
            // TRƯỜNG HỢP 1: User đã tồn tại
            
            // Nếu User đã là employer và đã sở hữu công ty khác
            if (userOwner.role === 'employer' && userOwner.companyRef) {
                 return res.status(400).json({ message: `Người dùng ${ownerEmail} đã là chủ sở hữu của một công ty khác. Vui lòng hủy liên kết trước.` });
            }
            
            // Nếu User tồn tại nhưng chưa là employer, tiếp tục sử dụng userOwner._id
            
        } else {
            // TRƯỜNG HỢP 2: User chưa tồn tại -> Tạo User mới (Employer)
            if (!ownerPassword) {
                 return res.status(400).json({ message: "Mật khẩu cho chủ sở hữu là bắt buộc khi tạo tài khoản mới." });
            }
            
            // Hash mật khẩu
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(ownerPassword, salt);
            
            // Tạo tài khoản User mới với vai trò 'employer'
            userOwner = new User({
                name: ownerName,
                email: ownerEmail,
                password: passwordHash,
                role: 'employer',
                status: 'active', // Admin tạo thì mặc định active
            });
            await userOwner.save();
        }

        // 3. Tạo đối tượng Company mới, liên kết với User đã có hoặc vừa tạo
        const newCompany = new Company({
            name, description, address, email, website, industry,
            userOwner: userOwner._id, // Gán ID của User
            verificationStatus: 'approved', // Admin tạo thì duyệt ngay
            isVerified: true, 
        });

        const savedCompany = await newCompany.save();

        // 4. Cập nhật thông tin của người dùng (chủ sở hữu)
        await User.findByIdAndUpdate(
            userOwner._id,
            { 
                role: 'employer', 
                companyRef: savedCompany._id // Liên kết với công ty mới
            },
            { new: true }
        );

        res.status(201).json({ 
            message: `Công ty ${name} đã được tạo thành công. Chủ sở hữu (${ownerEmail}) đã được tạo/cập nhật và liên kết.`, 
            company: savedCompany 
        });
    } catch (error) {
        console.error("Error creating company and user:", error);
        // Xử lý lỗi trùng tên (E11000) hoặc lỗi khác
        res.status(409).json({ 
            message: error.message,
            details: error.code === 11000 ? "Tên công ty hoặc Email của công ty đã tồn tại." : null
        });
    }
};

// Hàm sửa thông tin, Xác thực, Cấm, Bỏ Cấm
export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { status, banReason, adminId } = updates;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `Không tìm thấy công ty với ID: ${id}` });
  }

  try {
    let updateFields = { ...updates };

    // Xử lý logic Cấm/Bỏ Cấm
    if (status === 'Banned') {
      updateFields.isBanned = true;
      updateFields.bannedDetails = {
        reason: banReason || "Bị cấm bởi quản trị viên",
        adminId: adminId || '63701cc1f03239c72c000050', // Placeholder Admin ID
        banDate: new Date(),
      };
    } else if (status === 'Verified') {
      updateFields.isVerified = true;
      updateFields.isBanned = false; // Đảm bảo không bị cấm khi xác thực
      updateFields.bannedDetails = null; // Xóa chi tiết cấm
    } else if (status === 'Pending' && updates.unban) {
       // Xử lý Bỏ Cấm từ trạng thái 'Banned'
      updateFields.isBanned = false;
      updateFields.bannedDetails = null; 
      updateFields.isVerified = false; // Đặt lại trạng thái xác thực nếu cần
    } else if (status === 'Deleted') {
      updateFields.isBanned = false; // Đảm bảo bỏ cấm nếu bị xóa
      updateFields.isVerified = false;
    }
    
    delete updateFields._id;
    
    const updatedCompany = await Company.findByIdAndUpdate(id, updateFields, { new: true });
    
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Không tìm thấy công ty để cập nhật.' });
    }
    
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm xóa công ty (Soft Delete)
export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `Không tìm thấy công ty với ID: ${id}` });
  }

  try {
    // Soft Delete: Thay đổi status thành 'Deleted'
    const deletedCompany = await Company.findByIdAndUpdate(
      id, 
      { status: 'Deleted', isBanned: false, isVerified: false }, 
      { new: true }
    );
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

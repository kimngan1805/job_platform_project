import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Rnd } from 'react-rnd'; // Thư viện kéo thả (Nhớ npm install react-rnd)
import { 
    Menu, Image, Type, Palette, Upload, Wrench, FolderOpen, Grid, 
    Share2, Printer, Plus, ZoomIn, ZoomOut, Save, Crown, X, Settings,
    Search, Mic, ArrowRight, Shapes, Sticker, PlayCircle, Music, PieChart, 
    Table, Layout, Box, MonitorPlay, Sparkles, MoreHorizontal, Video, Disc, Film,
    // Icon Toolbar
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Minus,
    // Icon Elements
    Star, Heart, Triangle, Circle, Square, Cloud, Sun, Smile, Zap, Award, Gift, ThumbsUp
} from 'lucide-react';

import "./CVEditorPage.css";
import CVTemplate1 from '../../components/cv-templates/CVTemplate1';
import CVTemplate2 from '../../components/cv-templates/CVTemplate2';

export default function CVEditorPage() {
    const location = useLocation();

    // ================= STATE QUẢN LÝ CHUNG =================
    const [zoom, setZoom] = useState(69);
    const [activeTab, setActiveTab] = useState('templates'); 
    const [editingElement, setEditingElement] = useState(null);
    const [currentTemplate, setCurrentTemplate] = useState(location.state?.templateId || 'scrapbook');

    // --- State Style & Color Picker ---
    const [styles, setStyles] = useState({}); 
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colors = ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#FFFFFF', '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'];

    // --- Các Element Kéo thả trên Canvas ---
    const [canvasStickers, setCanvasStickers] = useState([]); // Icon/Shape
    const [canvasTexts, setCanvasTexts] = useState([]);       // Text Box
    const [canvasImages, setCanvasImages] = useState([]);     // Ảnh (MỚI THÊM)

    // --- State Uploads ---
    const fileInputRef = useRef(null);
    const [uploadTab, setUploadTab] = useState('images'); 
    const [uploadedImages, setUploadedImages] = useState([
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=300&fit=crop"
    ]);
    const uploadedVideos = ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=300&h=300&fit=crop"];
    const uploadedAudio = [{ name: "Happy Vibes.mp3", duration: "2:14", date: "Today" }, { name: "Podcast Intro.wav", duration: "0:45", date: "Yesterday" }];

    // --- DATA NỘI DUNG TEMPLATE CỐ ĐỊNH ---
    const [elements, setElements] = useState({
        // Scrapbook Content
        title: 'Harumi Kobayashi',
        intro: 'Hello everyone, let me introduce myself, my name is Nana. My current activities include studying and working as an insurance graphic designer. I also cast, also like pastel colors.',
        greeting: 'Hello\nEveryone!',
        greetingName: 'My name is\nCindi Ezz',
        beachTitle: 'Beach is\nMy favorite\nplace!',
        beachCaption: 'Paxville Beach',
        funFacts: [
            'I highly like everything to be tidy',
            'I like trying new experiences',
            'I don\'t like not using stickers!',
            'I\'m using korean when I need my cry smth',
            'I love the smell of forest and books and fresh paint',
            'I highly like staying imaginative and listen'
        ],
        // CV Templates Content
        fullName: "NGUYỄN TRÚC QUỲNH MY",
        jobTitle: "NHÂN VIÊN BÁN HÀNG",
        phone: "+84 123 456 789",
        email: "ngtrucquynhmy@gmail.com",
        address: "Quận 10, TP.HCM",
        dob: "27/01/1998",
        profile: "Tôi là nhân viên bán hàng chuyên nghiệp...",
        objective: "Mong muốn tìm kiếm cơ hội thăng tiến...",
        languages: "Tiếng Anh | Tiếng Việt",
        social: "@quynhmy.work",
        skills: ["Giao tiếp", "Xử lý tình huống", "Word/Excel"],
        education: { year: "2016 - 2020", school: "Đại Học Kinh Tế", university: "UEH", degree: "Cử nhân QTKD", details: ["GPA: 3.6/4.0"] },
        experience: [{ role: "Trưởng nhóm", company: "Larana Stores", year: "2021 - Nay", details: ["Quản lý đội ngũ"] }]
    });

    // ================= HANDLERS =================

    // --- General Handlers ---
    const handleInteract = (elementId, e) => { if(e) e.stopPropagation(); setEditingElement(elementId); setShowColorPicker(false); };
    const handleDoubleClick = (elementId) => { setEditingElement(elementId); setShowColorPicker(false); };
    const handleBlur = () => { /* Giữ focus */ };
    const handleChange = (key, value) => {
        const isCanvasText = canvasTexts.find(t => t.id.toString() === key);
        if (isCanvasText) {
            setCanvasTexts(prev => prev.map(t => t.id.toString() === key ? { ...t, content: value } : t));
        } else {
            setElements(prev => ({ ...prev, [key]: value }));
        }
    };
    const handleFactChange = (index, value) => {
        const newFacts = [...elements.funFacts];
        newFacts[index] = value;
        setElements({ ...elements, funFacts: newFacts });
    };
    
    // --- Upload Handlers ---
    const handleUploadClick = () => fileInputRef.current.click();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImages([URL.createObjectURL(file), ...uploadedImages]);
            setUploadTab('images'); 
        }
    };

    // --- Sticker Handlers ---
    const addStickerToCanvas = (iconComponent, colorClass) => {
        const newSticker = { id: Date.now(), component: iconComponent, colorClass: colorClass, x: 200, y: 200, width: 80, height: 80 };
        setCanvasStickers(prev => [...prev, newSticker]);
    };
    const removeSticker = (id) => setCanvasStickers(prev => prev.filter(s => s.id !== id));

    // --- Text Box Handlers ---
    const addTextToCanvas = (type) => {
        const id = Date.now();
        let initStyle = {}; let initContent = "Text";
        if (type === 'heading') { initStyle = { fontSize: 32, fontWeight: 'bold' }; initContent = "Add a heading"; } 
        else if (type === 'subheading') { initStyle = { fontSize: 20, fontWeight: 'bold' }; initContent = "Add a subheading"; } 
        else { initStyle = { fontSize: 14 }; initContent = "Add a little bit of body text"; }
        const newText = { id: id, content: initContent, x: 150, y: 150, width: 300, height: 50, ...initStyle };
        setCanvasTexts(prev => [...prev, newText]);
        setStyles(prev => ({ ...prev, [id]: { bold: type !== 'body', size: type === 'heading' ? 32 : (type === 'subheading' ? 20 : 14), color: '#000000', align: 'left' } }));
    };
    const removeText = (id) => setCanvasTexts(prev => prev.filter(t => t.id !== id));

    // --- Image Drag & Drop Handlers (MỚI THÊM) ---
    // 1. Bắt đầu kéo ảnh từ sidebar
    const handleDragStart = (e, imageSrc) => {
        e.dataTransfer.setData("imageSrc", imageSrc);
    };

    // 2. Thả ảnh vào canvas
    const handleDrop = (e) => {
        e.preventDefault();
        const imageSrc = e.dataTransfer.getData("imageSrc");
        if (imageSrc) {
            // Lấy vị trí thả (tương đối so với canvas - cần tính toán kỹ hơn nếu muốn chính xác)
            // Tạm thời thả vào một vị trí cố định hoặc ngẫu nhiên
            const newImage = {
                id: Date.now(),
                src: imageSrc,
                x: e.nativeEvent.offsetX - 100, // Thả vào vị trí con trỏ (ước lượng)
                y: e.nativeEvent.offsetY - 100,
                width: 200,
                height: 200
            };
            setCanvasImages(prev => [...prev, newImage]);
        }
    };

    // 3. Cho phép thả vào canvas
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 4. Xóa ảnh
    const removeImage = (id) => setCanvasImages(prev => prev.filter(img => img.id !== id));

    // --- Style Handlers ---
    const toggleStyle = (styleKey, value = null) => {
        if (!editingElement) return;
        setStyles(prev => {
            const current = prev[editingElement] || {};
            const newValue = value !== null ? value : !current[styleKey];
            return { ...prev, [editingElement]: { ...current, [styleKey]: newValue } };
        });
        if (styleKey === 'color') setShowColorPicker(false);
    };
    const currentStyle = styles[editingElement] || {};

    // ================= COMPONENTS CON =================

    // 1. Text Toolbar (Giữ nguyên)
    const TextToolbar = () => {
        if (!editingElement) return null; 
        const displaySize = currentStyle.size || 16;
        return (
            <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-3 animate-slide-down shadow-sm z-30 relative">
                <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded border border-gray-200 text-sm w-40 justify-between"><span className="truncate">Inter</span><ArrowRight className="w-3 h-3 rotate-90" /></button>
                <div className="flex items-center border border-gray-200 rounded"><button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100" onClick={() => toggleStyle('size', Math.max(8, displaySize - 1))}><Minus className="w-3 h-3"/></button><input type="text" value={displaySize} readOnly className="w-10 text-center text-sm font-medium outline-none border-x border-gray-200 h-8" /><button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100" onClick={() => toggleStyle('size', displaySize + 1)}><Plus className="w-3 h-3"/></button></div>
                <div className="relative">
                    <button onClick={() => setShowColorPicker(!showColorPicker)} className={`w-8 h-8 flex flex-col items-center justify-center rounded border transition-colors relative ${showColorPicker ? 'bg-gray-100 border-gray-300' : 'border-transparent hover:border-gray-200 hover:bg-gray-100'}`}><span className="font-bold text-sm">A</span><span className="w-4 h-1 rounded-full" style={{ background: currentStyle.color || 'black' }}></span></button>
                    {showColorPicker && (
                        <div className="absolute top-10 left-0 bg-white shadow-xl border border-gray-200 p-3 rounded-lg z-50 w-64 animate-in fade-in zoom-in-95 duration-100">
                            <div className="grid grid-cols-6 gap-2">{colors.map((color) => (<button key={color} onClick={() => toggleStyle('color', color)} className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition-transform shadow-sm relative group" style={{ backgroundColor: color }}>{currentStyle.color === color && <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md text-xs font-bold">✓</span>}</button>))}</div>
                            <div className="mt-3 pt-2 border-t border-gray-100"><button onClick={() => toggleStyle('color', 'inherit')} className="w-full py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">Reset</button></div>
                        </div>
                    )}
                </div>
                <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>
                <button onClick={() => toggleStyle('bold')} className={`p-1.5 rounded hover:bg-gray-100 ${currentStyle.bold ? 'bg-purple-100 text-purple-600' : ''}`}><Bold className="w-4 h-4" /></button>
                <button onClick={() => toggleStyle('italic')} className={`p-1.5 rounded hover:bg-gray-100 ${currentStyle.italic ? 'bg-purple-100 text-purple-600' : ''}`}><Italic className="w-4 h-4" /></button>
                <button onClick={() => toggleStyle('underline')} className={`p-1.5 rounded hover:bg-gray-100 ${currentStyle.underline ? 'bg-purple-100 text-purple-600' : ''}`}><Underline className="w-4 h-4" /></button>
                <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>
                <button onClick={() => toggleStyle('align', 'left')} className={`p-1.5 rounded ${currentStyle.align === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><AlignLeft className="w-4 h-4" /></button>
                <button onClick={() => toggleStyle('align', 'center')} className={`p-1.5 rounded ${currentStyle.align === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><AlignCenter className="w-4 h-4" /></button>
                <button onClick={() => toggleStyle('align', 'right')} className={`p-1.5 rounded ${currentStyle.align === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><AlignRight className="w-4 h-4" /></button>
                <button onClick={() => setEditingElement(null)} className="ml-auto p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><X className="w-5 h-5" /></button>
            </div>
        );
    };

    // 2. Editable Text (Giữ nguyên)
    const EditableText = ({ id, value, className, multiline = false, style = {} }) => {
        const isEditing = editingElement === id || editingElement === id.toString();
        const elStyle = styles[id] || styles[id.toString()] || {};
        const customStyle = { fontWeight: elStyle.bold ? 'bold' : 'normal', fontStyle: elStyle.italic ? 'italic' : 'normal', textDecoration: elStyle.underline ? 'underline' : 'none', color: elStyle.color || 'inherit', textAlign: elStyle.align || 'left', fontSize: elStyle.size ? `${elStyle.size}px` : 'inherit', outline: 'none', whiteSpace: 'pre-wrap', ...style };
        const displayValue = canvasTexts.find(t => t.id === id)?.content || elements[id] || value;
        return (
            <div contentEditable suppressContentEditableWarning={true} onClick={(e) => { e.stopPropagation(); setEditingElement(id.toString()); }} onBlur={(e) => handleChange(id.toString(), e.currentTarget.innerText)} className={`${className || ''} transition-all duration-200 cursor-text ${isEditing ? 'ring-2 ring-purple-500 rounded p-1 bg-purple-50/10' : 'hover:ring-1 hover:ring-blue-200 rounded p-1 border border-transparent'}`} style={customStyle}>{displayValue}</div>
        );
    };

    // 3. Drawer Content
    const renderDrawerContent = () => {
        if (activeTab === 'templates') { 
            return (
                <>
                    <div className="p-4 border-b"><input type="text" placeholder="Search templates..." className="w-full px-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 rounded-lg text-sm outline-none" /></div>
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                        <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">All Templates</h3>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                             <div onClick={() => setCurrentTemplate('scrapbook')} className={`aspect-[3/4] bg-[#FDF2F8] rounded-lg cursor-pointer relative shadow-sm border border-pink-200 group ${currentTemplate === 'scrapbook' ? 'ring-2 ring-purple-500' : ''}`}><div className="absolute inset-0 flex items-center justify-center text-pink-300 opacity-50 text-2xl font-brush">Scrapbook</div></div>
                             <div onClick={() => setCurrentTemplate('harvard')} className={`aspect-[3/4] bg-white rounded-lg cursor-pointer relative shadow-sm border border-gray-200 group ${currentTemplate === 'harvard' ? 'ring-2 ring-blue-500' : ''}`}><div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif">Harvard</div></div>
                             <div onClick={() => setCurrentTemplate('minimal')} className={`aspect-[3/4] bg-gray-50 rounded-lg cursor-pointer relative shadow-sm border border-gray-200 group ${currentTemplate === 'minimal' ? 'ring-2 ring-green-500' : ''}`}><div className="absolute inset-0 flex items-center justify-center text-gray-400 font-sans">Minimal</div></div>
                        </div>
                    </div>
                </>
            );
        }
        if (activeTab === 'elements') {
            const elementItems = [{ name: 'Shape', icon: <Square fill="currentColor" />, color: 'text-blue-500' }, { name: 'Circle', icon: <Circle fill="currentColor" />, color: 'text-red-500' }, { name: 'Triangle', icon: <Triangle fill="currentColor" />, color: 'text-green-500' }, { name: 'Star', icon: <Star fill="currentColor" />, color: 'text-yellow-500' }, { name: 'Heart', icon: <Heart fill="currentColor" />, color: 'text-pink-500' }, { name: 'Sun', icon: <Sun fill="currentColor" />, color: 'text-orange-500' }, { name: 'Cloud', icon: <Cloud fill="currentColor" />, color: 'text-sky-500' }, { name: 'Zap', icon: <Zap fill="currentColor" />, color: 'text-purple-500' }, { name: 'Award', icon: <Award />, color: 'text-teal-500' }, { name: 'Gift', icon: <Gift />, color: 'text-indigo-500' }, { name: 'Like', icon: <ThumbsUp />, color: 'text-blue-600' }, { name: 'Smile', icon: <Smile />, color: 'text-yellow-600' }];
            return (
                <>
                    <div className="p-4 pb-2"><div className="relative group"><input type="text" placeholder="Search elements..." className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm outline-none" /><Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" /></div></div>
                    <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
                        <div><h3 className="text-sm font-bold text-gray-800 mb-3">Shapes & Graphics</h3><div className="grid grid-cols-3 gap-3">{elementItems.map((item, idx) => (<div key={idx} onClick={() => addStickerToCanvas(item.icon, item.color)} className="flex flex-col items-center cursor-pointer group hover:bg-gray-50 rounded-xl p-2"><div className={`w-10 h-10 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${item.color} bg-opacity-10 rounded-lg`}>{React.cloneElement(item.icon, { className: "w-6 h-6" })}</div><span className="text-[10px] font-medium text-gray-600">{item.name}</span></div>))}</div></div>
                    </div>
                </>
            );
        }
        if (activeTab === 'text') {
            return (
                <>
                    <div className="p-4 pb-2"><div className="relative"><Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search fonts" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm outline-none" /></div></div>
                    <div className="px-4 pb-4 space-y-3"><button className="w-full py-2.5 bg-[#8B3DFF] text-white rounded-lg text-sm font-medium hover:bg-[#7b35e0]" onClick={() => addTextToCanvas('body')}>Add a text box</button><button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50"><Sparkles className="w-4 h-4 text-teal-500" /> Magic Write</button></div>
                    <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar space-y-6">
                        <div><div className="flex justify-between items-center mb-2"><h3 className="text-xs font-bold text-gray-500 uppercase">Default text styles</h3></div><div className="space-y-3"><button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg" onClick={() => addTextToCanvas('heading')}><span className="text-3xl font-bold text-gray-800">Add a heading</span></button><button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg" onClick={() => addTextToCanvas('subheading')}><span className="text-xl font-semibold text-gray-800">Add a subheading</span></button><button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg" onClick={() => addTextToCanvas('body')}><span className="text-sm text-gray-600">Add a little bit of body text</span></button></div></div>
                        <div><h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Font combinations</h3><div className="grid grid-cols-2 gap-3"><div className="bg-[#E6F0FF] p-4 rounded-lg cursor-pointer flex flex-col justify-center items-center text-blue-600"><span className="font-brush text-2xl">Quick</span><span className="font-black text-xl uppercase tracking-widest">WIN</span></div><div className="bg-[#F0FDF4] p-4 rounded-lg cursor-pointer flex flex-col justify-center items-center text-green-700"><span className="font-bold text-lg">HUGE</span><span className="text-xs tracking-[0.2em] uppercase">Sale</span></div><div className="bg-[#FEF2F2] p-4 rounded-lg cursor-pointer flex flex-col justify-center items-center text-red-500"><span className="font-serif text-2xl italic">Lovelace</span></div><div className="bg-[#FFF7ED] p-4 rounded-lg cursor-pointer flex flex-col justify-center items-center text-orange-600"><span className="font-mono text-sm bg-orange-200 px-2 py-1">CODE</span></div></div></div>
                    </div>
                </>
            );
        }
        
        // TAB 4: UPLOADS (CẬP NHẬT ĐỂ KÉO ẢNH)
        if (activeTab === 'uploads') {
            return (
                <>
                    <div className="p-4 pb-2"><div className="relative"><Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search uploads" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm outline-none" /></div></div>
                    <div className="px-4 pb-4 space-y-3"><div className="flex gap-2"><button onClick={handleUploadClick} className="flex-1 py-2.5 bg-[#8B3DFF] text-white rounded-lg text-sm font-medium hover:bg-[#7b35e0]">Upload files</button><input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*,audio/*" /><button className="w-10 flex items-center justify-center bg-[#8B3DFF] text-white rounded-lg hover:bg-[#7b35e0]"><MoreHorizontal className="w-5 h-5"/></button></div><button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Record yourself</button></div>
                    <div className="px-4 border-b border-gray-100 flex gap-6 text-sm"><button onClick={() => setUploadTab('images')} className={`pb-3 border-b-2 ${uploadTab === 'images' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}>Images</button><button onClick={() => setUploadTab('videos')} className={`pb-3 border-b-2 ${uploadTab === 'videos' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}>Videos</button><button onClick={() => setUploadTab('audio')} className={`pb-3 border-b-2 ${uploadTab === 'audio' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}>Audio</button></div>
                    <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
                         {uploadTab === 'images' && (
                             <>
                                <div className="mb-4 rounded-lg bg-gray-50 p-3 border border-gray-200 flex items-center justify-between relative"><div className="flex items-center gap-2"><span className="text-xl">🎨</span><div><h4 className="text-xs font-bold text-gray-800">Background Remover</h4><p className="text-[10px] text-gray-500">Remove background...</p></div></div><X className="w-4 h-4 text-gray-400 cursor-pointer" /></div>
                                <div className="grid grid-cols-2 gap-2">
                                     {uploadedImages.map((src, idx) => (
                                         // THÊM draggable VÀ onDragStart VÀO ĐÂY
                                         <div 
                                            key={idx} 
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, src)}
                                            className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-grab border border-transparent hover:border-blue-500"
                                        >
                                             <img src={src} alt="uploaded" className="w-full h-full object-cover" />
                                         </div>
                                     ))}
                                </div>
                             </>
                         )}
                         {uploadTab === 'videos' && (<div className="grid grid-cols-2 gap-2">{uploadedVideos.map((src, idx) => (<div key={idx} className="group relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 cursor-pointer border border-transparent hover:border-blue-500"><img src={src} alt="video" className="w-full h-full object-cover opacity-80" /><div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-8 h-8 text-white" /></div></div>))}</div>)}
                         {uploadTab === 'audio' && (<div className="space-y-2">{uploadedAudio.map((audio, idx) => (<div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"><div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center"><Music className="w-5 h-5" /></div><div className="flex-1 min-w-0"><h4 className="text-sm font-medium truncate">{audio.name}</h4><p className="text-xs text-gray-400">{audio.duration}</p></div><MoreHorizontal className="w-4 h-4 text-gray-400" /></div>))}</div>)}
                    </div>
                </>
            );
        }
        return <div className="p-8 text-center text-gray-400">Content for {activeTab}</div>;
    };

    // ================= RENDER GIAO DIỆN CHÍNH =================
    return (
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans text-gray-800">
            {/* Sidebar Trái */}
            <div className="w-[88px] bg-white border-r border-gray-200 flex flex-col items-center py-6 z-50 shadow-sm"><div className="mb-8 cursor-pointer p-2 hover:bg-gray-100 rounded-xl"><div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg"><span className="font-bold text-lg">CV</span></div></div><div className="flex-1 flex flex-col w-full px-3 gap-3 overflow-y-auto no-scrollbar">{[{ id: 'templates', icon: Grid, label: 'Design' }, { id: 'elements', icon: Image, label: 'Elements' }, { id: 'text', icon: Type, label: 'Text' }, { id: 'brand', icon: Palette, label: 'Brand' }, { id: 'uploads', icon: Upload, label: 'Uploads' }, { id: 'projects', icon: FolderOpen, label: 'Projects' }].map((item) => (<div key={item.id} onClick={() => setActiveTab(item.id)} className={`sidebar-item flex flex-col items-center justify-center py-3 cursor-pointer group ${activeTab === item.id ? 'active' : 'text-gray-400 hover:bg-gray-50'}`}><item.icon className={`w-6 h-6 mb-1.5 ${activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-2'}`} /><span className="text-[10px] font-medium">{item.label}</span></div>))}</div><div className="mt-auto flex flex-col w-full px-3 gap-2 pt-4 border-t border-gray-100"><div className="sidebar-item flex flex-col items-center justify-center py-3 cursor-pointer text-gray-400 hover:bg-gray-50"><Settings className="w-5 h-5 mb-1" /><span className="text-[9px]">Settings</span></div></div></div>
            {/* Drawer */}
            {activeTab && (<div className="w-[360px] bg-white border-r border-gray-200 flex flex-col animate-slide-right shadow-xl z-40">{renderDrawerContent()}<button onClick={() => setActiveTab(null)} className="absolute -right-3 top-1/2 w-6 h-12 bg-white border border-gray-200 rounded-r-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 text-gray-400"><span className="text-xs">‹</span></button></div>)}
            
            {/* Main Canvas */}
            <div className="flex-1 flex flex-col relative bg-[#F0F2F5]">
                <div className="z-20 shadow-sm relative">{!editingElement ? (<div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4"><div className="flex items-center space-x-2"><button className="hover:bg-gray-100 px-3 py-1.5 rounded text-sm font-medium text-gray-600">File</button><span className="text-sm font-semibold text-gray-700 capitalize ml-2">{currentTemplate} CV</span></div><button className="bg-blue-600 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-md">Share</button></div>) : <TextToolbar />}</div>
                
                {/* --- KHU VỰC CANVAS (THÊM onDrop VÀ onDragOver) --- */}
                <div 
                    className="flex-1 overflow-auto p-12 flex justify-center" 
                    onClick={handleBlur}
                    onDrop={handleDrop} // Xử lý khi thả ảnh
                    onDragOver={handleDragOver} // Cho phép thả
                >
                    <div className="bg-white shadow-2xl rounded-sm transition-transform duration-200 origin-top relative" style={{ transform: `scale(${zoom / 100})`, padding: currentTemplate === 'scrapbook' ? '48px' : '0', width: '800px', height: '1131px', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
                        
                        {/* 1. NỘI DUNG TEMPLATE SCRAPBOOK (CŨ - ĐẦY ĐỦ) */}
                        {currentTemplate === 'scrapbook' && (
                            <div className="relative h-full">
                                {/* Header */}
                                <div className="flex items-start mb-8">
                                    <div className="w-2 h-32 bg-blue-300 rounded-full mr-6 opacity-80" />
                                    <div>
                                        <EditableText id="title" value={elements.title} className="text-5xl font-bold text-pink-400 mb-2 font-sans" />
                                        <div className="max-w-md mt-2"><EditableText id="intro" value={elements.intro} className="text-gray-500 text-sm leading-relaxed" multiline /></div>
                                    </div>
                                    <div className="ml-auto relative">
                                        <div className="grid grid-cols-2 gap-2 rotate-3 bg-white p-1 shadow-sm">{[1, 2, 3, 4].map(i => <div key={i} className="w-20 h-20 bg-gray-200 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-300"><Upload className="w-5 h-5 text-gray-400" /></div>)}</div>
                                        <div className="absolute -top-3 -right-3 text-3xl text-red-500 drop-shadow-md transform -rotate-12">📌</div>
                                    </div>
                                </div>
                                {/* Hello Everyone */}
                                <div className="flex items-start gap-8 mb-10">
                                    <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 shadow-md border-4 border-white/80">
                                            <EditableText id="greeting" value={elements.greeting} className="font-brush text-4xl text-green-600 leading-tight mb-2" multiline />
                                            <EditableText id="greetingName" value={elements.greetingName} className="text-sm text-gray-500 font-medium" multiline />
                                        </div>
                                        <div className="absolute -right-4 top-1/2 text-2xl animate-pulse">✨</div>
                                    </div>
                                    <div className="ml-auto bg-green-50/80 p-4 rounded-lg shadow-sm border border-green-100 backdrop-blur-sm min-w-[200px]">
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between border-b border-green-200 pb-1"><span className="text-gray-500">Birthday</span><span className="font-semibold text-gray-700">12 Sep 2002</span></div>
                                            <div className="flex justify-between border-b border-green-200 pb-1"><span className="text-gray-500">Movies</span><span className="font-semibold text-pink-500">Drama</span></div>
                                            <div className="flex justify-between"><span className="text-gray-500">Research</span><span className="font-semibold text-yellow-500">Summer</span></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Beach & Fun Facts */}
                                <div className="grid grid-cols-12 gap-8">
                                    <div className="col-span-5 relative">
                                        <EditableText id="beachTitle" value={elements.beachTitle} className="font-brush text-4xl text-gray-800 leading-tight mb-4 block" multiline />
                                        <div className="w-full h-40 bg-purple-100 rotate-2 rounded-lg border-4 border-white shadow-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                            <span className="text-purple-300 text-4xl">🏖️</span>
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Upload className="text-white w-8 h-8"/></div>
                                        </div>
                                        <div className="absolute bottom-4 right-0 bg-white px-3 py-1 rounded shadow text-xs font-bold text-blue-500 rotate-[-3deg]">
                                            <EditableText id="beachCaption" value={elements.beachCaption} className=""/>
                                        </div>
                                    </div>
                                    <div className="col-span-7 relative pt-6">
                                        <div className="absolute -top-4 left-0 text-5xl opacity-50 transform rotate-12">✏️</div>
                                        <h3 className="font-brush text-3xl text-blue-500 mb-4 ml-10">Fun Facts:</h3>
                                        <ul className="space-y-3 ml-6">
                                            {elements.funFacts.map((fact, index) => {
                                                const colors = ['text-pink-400', 'text-green-400', 'text-blue-400', 'text-yellow-400', 'text-purple-400', 'text-red-400'];
                                                const isEditing = editingElement === `fact-${index}`;
                                                return (
                                                    <li key={index} className="flex items-start text-sm group">
                                                        <span className={`${colors[index]} font-bold mr-2 text-lg`}>{index + 1}.</span>
                                                        <div className="flex-1 mt-0.5">
                                                            {isEditing ? <input autoFocus value={fact} onChange={(e) => handleFactChange(index, e.target.value)} onBlur={handleBlur} className="w-full border-b border-blue-500 focus:outline-none bg-transparent"/> : <span onDoubleClick={() => handleDoubleClick(`fact-${index}`)} className="cursor-pointer hover:bg-yellow-50 px-1 rounded transition-colors">{fact}</span>}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- HARVARD & MINIMAL TEMPLATES --- */}
                        {currentTemplate === 'harvard' && <CVTemplate1 data={elements} onInteract={handleInteract} selectedId={editingElement} onUpdate={handleChange} />}
                        {currentTemplate === 'minimal' && <CVTemplate2 data={elements} onInteract={handleInteract} selectedId={editingElement} onUpdate={handleChange} />}

                        {/* 2. LỚP STICKERS KÉO THẢ (Nằm đè lên trên) */}
                        {canvasStickers.map((sticker) => (
                            <Rnd
                                key={sticker.id}
                                default={{ x: sticker.x, y: sticker.y, width: sticker.width, height: sticker.height }}
                                bounds="parent"
                                className={`group ${sticker.colorClass} pointer-events-auto`}
                                onDragStart={(e) => { e.stopPropagation(); setEditingElement(null); }}
                            >
                                <div className="w-full h-full relative hover:ring-2 hover:ring-blue-400 ring-offset-2 rounded">
                                    {React.cloneElement(sticker.component, { className: "w-full h-full drop-shadow-sm" })}
                                    <button onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }} onMouseDown={(e) => e.stopPropagation()} className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-50 scale-75"><X className="w-4 h-4" /></button>
                                </div>
                            </Rnd>
                        ))}

                        {/* 3. LỚP TEXT KÉO THẢ (Nằm đè lên trên cùng) */}
                        {canvasTexts.map((textItem) => (
                            <Rnd
                                key={textItem.id}
                                default={{ x: textItem.x, y: textItem.y, width: textItem.width, height: textItem.height }}
                                bounds="parent"
                                onDragStart={(e) => { e.stopPropagation(); setEditingElement(null); }}
                                enableResizing={{ top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
                            >
                                <div className="w-full h-full relative group">
                                    <EditableText id={textItem.id} value={textItem.content} className="w-full h-full" style={{ fontSize: textItem.fontSize, fontWeight: textItem.fontWeight }} />
                                    <button onClick={(e) => { e.stopPropagation(); removeText(textItem.id); }} onMouseDown={(e) => e.stopPropagation()} className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-50 scale-75"><X className="w-4 h-4" /></button>
                                </div>
                            </Rnd>
                        ))}

                        {/* 4. LỚP ẢNH KÉO THẢ (MỚI THÊM) */}
                        {canvasImages.map((img) => (
                            <Rnd
                                key={img.id}
                                default={{ x: img.x, y: img.y, width: img.width, height: img.height }}
                                bounds="parent"
                                className="group pointer-events-auto"
                                onDragStart={(e) => { e.stopPropagation(); setEditingElement(null); }}
                            >
                                <div className="w-full h-full relative hover:ring-2 hover:ring-blue-400 ring-offset-2 rounded overflow-hidden">
                                    <img src={img.src} alt="dropped" className="w-full h-full object-cover" />
                                    {/* Nút xóa Ảnh */}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); removeImage(img.id); }} 
                                        onMouseDown={(e) => e.stopPropagation()} 
                                        className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-50 scale-75"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </Rnd>
                        ))}

                    </div>
                </div>
                <div className="h-14 bg-white border-t flex items-center justify-between px-6 z-20"><button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium"><Plus className="w-4 h-4 mr-2" /> Add page</button><div className="flex items-center gap-4"><ZoomOut className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setZoom(Math.max(10, zoom - 10))} /><span className="text-xs font-bold text-gray-600 w-8 text-center">{zoom}%</span><ZoomIn className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setZoom(Math.min(200, zoom + 10))} /></div></div>
            </div>
        </div>
    );
}
"use client"

import { createFounder } from '@/lib/actions/founders';
import React, { useState } from 'react';
import toast from 'react-hot-toast'; 

export default function MyStartupPage() {
  const [formData, setFormData] = useState({
    startupName: '',
    industry: '',
    description: '',
    fundingStage: '',
    founderEmail: '',
  });
  
  const [logoFile, setLogoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  // প্রোফাইল সেভ করার জন্য
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 🚀 এখানে FormData ব্যবহার করে 'payload' তৈরি করা হয়েছে
      const payload = new FormData();
      
      // পেলোডের ভেতর ফর্মের সব টেক্সট ডেটা যোগ করা হচ্ছে
      payload.append('startupName', formData.startupName);
      payload.append('industry', formData.industry);
      payload.append('description', formData.description);
      payload.append('fundingStage', formData.fundingStage);
      payload.append('founderEmail', formData.founderEmail);
      
      // পেলোডের ভেতর লোগো ফাইলটি যোগ করা হচ্ছে (যদি ইউজার সিলেক্ট করে)
      if (logoFile) {
        payload.append('logoFile', logoFile); 
      }

      // কনসোলে চেক করার জন্য (FormData সরাসরি দেখা যায় না, তাই entries দেখতে হয়)
      console.log("Submitting Payload:");
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      // সার্ভার অ্যাকশনে 'payload' পাঠানো হচ্ছে
      const res = await createFounder(payload); 
      
      if (res?.insertedId) {
        toast.success("Founder profile successfully completed!"); 
        
        // সফলভাবে সেভ হওয়ার পর ফর্ম রিসেট
        setFormData({
          startupName: '',
          industry: '',
          description: '',
          fundingStage: '',
          founderEmail: '',
        });
        setLogoFile(null);
      } else {
        toast.error("Something went wrong on the server!"); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile. Is the server running?"); 
    } finally {
      setIsUploading(false);
    }
  };

  // ফর্মের ডেটা মুছে ফেলার জন্য (Cancel Button)
  const handleCancel = () => {
    setFormData({
      startupName: '',
      industry: '',
      description: '',
      fundingStage: '',
      founderEmail: '',
    });
    setLogoFile(null);
    toast('Form cleared', { icon: '🧹' }); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 w-250">
      <div className="w-full p-4 bg-white ">
        
        <div className="border-b border-slate-100 pb-5 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Startup Profile Details</h2>
          <p className="text-slate-400 text-sm mt-1">Please fill in your startup information and upload your official logo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ১. Startup Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
            <label className="text-sm font-bold text-slate-800 md:pt-3">Startup Name</label>
            <div className="md:col-span-3">
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                placeholder="e.g. Apex Innovations"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* ২. Logo Upload Box */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
            <label className="text-sm font-bold text-slate-800 md:pt-3">Logo</label>
            <div className="md:col-span-3">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 bg-slate-50/50 flex flex-col md:flex-row items-center gap-4 transition-all hover:bg-slate-50">
                
                {/* preview box */}
                <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs overflow-hidden border border-slate-200 shrink-0">
                  {logoFile ? (
                    <img src={URL.createObjectURL(logoFile)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    "No Logo"
                  )}
                </div>

                {/* upload info */}
                <div className="flex-1 text-center md:text-left">
                  {logoFile ? (
                    <div>
                      <p className="text-sm font-semibold text-slate-700 truncate max-w-[250px]">{logoFile.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Ready to upload via imgbb</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-slate-600">Select your startup logo file</p>
                      <p className="text-xs text-slate-400 mt-0.5">Supports: PNG, JPG, SVG up to 2MB</p>
                    </div>
                  )}
                  
                  <label className="inline-block mt-3 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer transition-all shadow-sm">
                    {logoFile ? "Change File" : "Upload New File"}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  
                  <span className="text-xs font-bold text-blue-500/80 ml-3 tracking-wider uppercase">imgbb</span>
                </div>
              </div>
            </div>
          </div>

          {/* ৩. Industry */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
            <label className="text-sm font-bold text-slate-800 md:pt-3">Industry</label>
            <div className="md:col-span-3">
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Software & Technology (AI/ML)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* ৪. Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
            <label className="text-sm font-bold text-slate-800 md:pt-3">Description</label>
            <div className="md:col-span-3">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your startup's mission and solutions..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                required
              />
            </div>
          </div>

          {/* ৫. Funding Stage */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
            <label className="text-sm font-bold text-slate-800 md:pt-3">Funding Stage</label>
            <div className="md:col-span-3">
              <select
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              >
                <option value="" disabled>Select Funding Stage</option>
                <option value="Idea">Idea / Bootstrapped</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B+">Series B+</option>
              </select>
            </div>
          </div>

          {/* ৬. Founder Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
            <label className="text-sm font-bold text-slate-800 md:pt-3">Founder Email</label>
            <div className="md:col-span-3">
              <input
                type="email"
                name="founderEmail"
                value={formData.founderEmail}
                onChange={handleChange}
                placeholder="jane.doe@startup.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-4">
            <div className="hidden md:block"></div>
            <div className="md:col-span-3 flex justify-end items-center gap-3">
              
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-sm rounded-xl border border-slate-200 transition-all shadow-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-sm transition-all disabled:opacity-50"
              >
                {isUploading ? "Saving..." : "Save Profile"}
              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
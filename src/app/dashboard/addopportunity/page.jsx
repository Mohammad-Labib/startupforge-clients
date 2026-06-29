"use client"

import React, { useState } from 'react';
import { Input, Select, Button } from "@heroui/react"; // 👈 SelectItem বাদ দেওয়া হয়েছে
import { Briefcase, Check, CircleXmark } from "@gravity-ui/icons";
import { createOpportunity } from '@/lib/actions/opportunities';
import toast from 'react-hot-toast';

export default function OpportunityForm() {
  const [formData, setFormData] = useState({
    roleTitle: '',
    requiredSkills: '', 
    workType: '',
    commitmentLevel: '',
    deadline: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const processedData = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()).filter(Boolean),
    };

    try {
      const res = await createOpportunity(processedData);

      if (res?.success) {
        toast.success("Opportunity posted successfully!");
        
        setFormData({
          roleTitle: '',
          requiredSkills: '',
          workType: '',
          commitmentLevel: '',
          deadline: '',
        });
      } else {
        toast.error("Failed to save opportunity.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      roleTitle: '',
      requiredSkills: '',
      workType: '',
      commitmentLevel: '',
      deadline: '',
    });
    toast('Form cleared', { icon: '🧹' });
  };

  const workTypes = [
    { value: "Remote", label: "Remote" },
    { value: "Onsite", label: "Onsite" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  const commitmentLevels = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-default-100">
      <div className="border-b border-default-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="size-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Add New Opportunity</h2>
        </div>
        <p className="text-sm text-default-400 mt-1">Fill in the details to create a new role or position for talents.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* ১. Role Title */}
        <Input
          label="Role Title"
          labelPlacement="outside"
          name="roleTitle"
          value={formData.roleTitle}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer (React)"
          variant="bordered"
          isRequired
        />

        {/* ২. Required Skills */}
        <Input
          label="Required Skills"
          labelPlacement="outside"
          name="requiredSkills"
          value={formData.requiredSkills}
          onChange={handleChange}
          placeholder="e.g. React, TypeScript, Tailwind CSS (separated by commas)"
          variant="bordered"
          isRequired
        />

        {/* ৩. Work Type */}
        <Select
          label="Work Type"
          labelPlacement="outside"
          placeholder="Select Work Type"
          variant="bordered"
          selectedKeys={formData.workType ? [formData.workType] : []}
          onChange={(e) => handleSelectChange("workType", e.target.value)}
          isRequired
        >
          {workTypes.map((type) => (
            <option key={type.value} value={type.value} className="text-black dark:text-white bg-white dark:bg-zinc-800">
              {type.label}
            </option>
          ))}
        </Select>

        {/* ৪. Commitment Level */}
        <Select
          label="Commitment Level"
          labelPlacement="outside"
          placeholder="Select Commitment Level"
          variant="bordered"
          selectedKeys={formData.commitmentLevel ? [formData.commitmentLevel] : []}
          onChange={(e) => handleSelectChange("commitmentLevel", e.target.value)}
          isRequired
        >
          {commitmentLevels.map((level) => (
            <option key={level.value} value={level.value} className="text-black dark:text-white bg-white dark:bg-zinc-800">
              {level.label}
            </option>
          ))}
        </Select>

        {/* ৫. Deadline */}
        <Input
          type="date"
          label="Application Deadline"
          labelPlacement="outside"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          variant="bordered"
          isRequired
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-default-100">
          <Button 
            type="button" 
            variant="flat" 
            color="default"
            onPress={handleCancel}
            startContent={<CircleXmark className="size-4" />}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            color="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            startContent={!isSubmitting && <Check className="size-4" />}
          >
            Post Opportunity
          </Button>
        </div>

      </form>
    </div>
  );
}
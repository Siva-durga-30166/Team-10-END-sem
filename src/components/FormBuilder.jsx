import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Plus, GripVertical, Trash2, Save, Eye } from 'lucide-react';
import { ActionLogger, ActionTypes, createActionLogEntry } from '../utils/actionLogger';

export function FormBuilder({ navigate, currentUser }) {
  const [formTitle, setFormTitle] = useState('New Feedback Form');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: '1',
      type: 'star-rating',
      title: 'Overall Rating',
      description: 'How would you rate this course overall?',
      required: true
    }
  ]);

  useEffect(() => {
    if (currentUser) {
      ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          ActionTypes.FORM_CREATED,
          'Opened form builder to create/edit a feedback form',
          'form',
          'form-builder'
        )
      );
    }
  }, [currentUser]);

  const addQuestion = async () => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'text',
      title: 'New Question',
      description: '',
      required: false
    };
    setQuestions([...questions, newQuestion]);

    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          'Question Added',
          `Added new ${newQuestion.type} question to form "${formTitle}"`,
          'form-question',
          newQuestion.id,
          { questionType: newQuestion.type, formTitle }
        )
      );
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, [field]: value } : q)));
  };

  const deleteQuestion = async (id) => {
    const questionToDelete = questions.find(q => q.id === id);
    setQuestions(questions.filter(q => q.id !== id));

    if (currentUser && questionToDelete) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          'Question Deleted',
          `Deleted question "${questionToDelete.title}" from form "${formTitle}"`,
          'form-question',
          id,
          { questionTitle: questionToDelete.title, formTitle }
        )
      );
    }
  };

  const handleSaveAndPublish = async () => {
    const formData = {
      title: formTitle,
      description: formDescription,
      questions: questions,
      createdAt: new Date().toISOString(),
      status: 'published'
    };

    console.log('Saving form:', formData);

    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          ActionTypes.FORM_PUBLISHED,
          `Saved and published form "${formTitle}" with ${questions.length} questions`,
          'form',
          Date.now().toString(),
          {
            formTitle,
            questionCount: questions.length,
            formDescription: formDescription.substring(0, 100)
          }
        )
      );
    }

    alert('Form saved and published successfully!');
    navigate('teacher-dashboard');
  };

  const handlePreview = async () => {
    if (currentUser) {
      await ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          'Form Previewed',
          `Previewed form "${formTitle}" during editing`,
          'form',
          'preview',
          { formTitle, questionCount: questions.length }
        )
      );
    }

    console.log('Previewing form:', { title: formTitle, description: formDescription, questions });
    alert('Preview functionality coming soon!');
  };

  const QuestionCard = ({ question, index }) => (
    <Card className="p-6 bg-white border border-[#E2E8F0] rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <GripVertical className="w-5 h-5 text-[#475569] mr-2 cursor-move" />
          <span className="text-sm font-medium text-[#475569] font-['Inter']">
            Question {index + 1}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteQuestion(question.id)}
          className="text-[#EF4444] hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-[#0F172A] font-['Inter'] font-medium">Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(value) => updateQuestion(question.id, 'type', value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="star-rating">Star Rating</SelectItem>
              <SelectItem value="likert">Likert Scale</SelectItem>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="text">Text Response</SelectItem>
              <SelectItem value="yes-no">Yes/No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-[#0F172A] font-['Inter'] font-medium">Question Title</Label>
          <Input
            value={question.title}
            onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
            className="mt-2"
            placeholder="Enter your question..."
          />
        </div>

        <div>
          <Label className="text-[#0F172A] font-['Inter'] font-medium">Description (Optional)</Label>
          <Textarea
            value={question.description}
            onChange={(e) => updateQuestion(question.id, 'description', e.target.value)}
            className="mt-2"
            placeholder="Add additional context or instructions..."
          />
        </div>

        {(question.type === 'multiple-choice' || question.type === 'likert') && (
          <div>
            <Label className="text-[#0F172A] font-['Inter'] font-medium">Options</Label>
            <div className="mt-2 space-y-2">
              {question.options && question.options.length > 0 ? (
                question.options.map((option, optIndex) => (
                  <Input
                    key={optIndex}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(question.options || [])];
                      newOptions[optIndex] = e.target.value;
                      updateQuestion(question.id, 'options', newOptions);
                    }}
                    placeholder={`Option ${optIndex + 1}`}
                  />
                ))
              ) : (
                <>
                  <Input placeholder="Option 1" />
                  <Input placeholder="Option 2" />
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                className="text-[#2563EB]"
                onClick={() => {
                  const newOptions = [...(question.options || []), ''];
                  updateQuestion(question.id, 'options', newOptions);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-[#475569] hover:text-[#0F172A]"
            onClick={() => navigate('teacher-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
                Form Builder
              </h1>
              <p className="text-[#475569] font-['Inter']">
                Create and customize your feedback form
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-[#E2E8F0]" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                className="bg-[#22C55E] hover:bg-[#16a34a] text-white"
                onClick={handleSaveAndPublish}
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Form Settings */}
              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <h3 className="text-lg font-semibold text-[#0F172A] font-['Poppins'] mb-4">
                  Form Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[#0F172A] font-['Inter'] font-medium">Form Title</Label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="mt-2"
                      placeholder="Enter form title..."
                    />
                  </div>
                  <div>
                    <Label className="text-[#0F172A] font-['Inter'] font-medium">Description</Label>
                    <Textarea
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="mt-2"
                      placeholder="Provide instructions or context for respondents..."
                    />
                  </div>
                </div>
              </Card>

              {/* Questions */}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <QuestionCard key={question.id} question={question} index={index} />
                ))}

                <Button
                  onClick={addQuestion}
                  variant="outline"
                  className="w-full border-2 border-dashed border-[#E2E8F0] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] py-6"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>

            {/* Sidebar Panel */}
            <div className="space-y-6">
              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <h3 className="text-lg font-semibold text-[#0F172A] font-['Poppins'] mb-4">
                  Form Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#475569] font-['Inter']">Questions:</span>
                    <span className="font-medium text-[#0F172A] font-['Inter']">
                      {questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] font-['Inter']">Required:</span>
                    <span className="font-medium text-[#0F172A] font-['Inter']">
                      {questions.filter(q => q.required).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569] font-['Inter']">Est. Time:</span>
                    <span className="font-medium text-[#0F172A] font-['Inter']">
                      {Math.ceil(questions.length * 0.5)} min
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { ArrowLeft, Star, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';


const courseEvaluationQuestions = [
  { id: 1, type: 'star', question: 'Overall Course Rating', description: 'How would you rate this course overall?' },
  { id: 2, type: 'likert', question: 'Course Content Quality', description: 'The course content was relevant and well-structured.' },
  { id: 3, type: 'likert', question: 'Learning Objectives', description: 'The course clearly communicated learning objectives.' },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Preferred Learning Method',
    description: 'Which teaching method did you find most effective?',
    options: [
      'Interactive lectures with Q&A sessions',
      'Hands-on coding exercises and labs',
      'Group projects and collaborative work',
      'Individual assignments and homework',
      'Online resources and self-study materials',
    ],
  },
  { id: 5, type: 'likert', question: 'Course Difficulty', description: 'The course difficulty was appropriate for the level.' },
  { id: 6, type: 'likert', question: 'Assignment Quality', description: 'Assignments helped reinforce learning objectives.' },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'Time Management',
    description: 'How was the workload distribution throughout the semester?',
    options: ['Very well distributed', 'Mostly well distributed', 'Acceptable distribution', 'Poorly distributed', 'Very poorly distributed'],
  },
  { id: 8, type: 'likert', question: 'Resource Accessibility', description: 'Course materials and resources were easily accessible.' },
  { id: 9, type: 'likert', question: 'Course Relevance', description: 'This course will be valuable for my future career.' },
  { id: 10, type: 'text', question: 'Additional Comments', description: 'Please share any additional feedback, suggestions, or comments about the course.' },
];

const teachingQualityQuestions = [
  { id: 1, type: 'star', question: "Overall Teaching Quality", description: "How would you rate the instructor's overall teaching quality?" },
  { id: 2, type: 'likert', question: 'Knowledge and Expertise', description: 'The instructor demonstrated strong knowledge of the subject matter.' },
  { id: 3, type: 'likert', question: 'Clear Communication', description: 'The instructor communicated concepts clearly and effectively.' },
  { id: 4, type: 'likert', question: 'Engagement and Enthusiasm', description: 'The instructor was engaging and showed enthusiasm for the subject.' },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Teaching Style Preference',
    description: "Which aspect of the instructor's teaching was most effective?",
    options: [
      'Clear explanations and examples',
      'Interactive discussions and participation',
      'Use of visual aids and technology',
      'Real-world applications and case studies',
      'Encouraging questions and feedback',
    ],
  },
  { id: 6, type: 'likert', question: 'Feedback Quality', description: 'The instructor provided helpful and timely feedback on assignments.' },
  { id: 7, type: 'likert', question: 'Availability and Support', description: 'The instructor was available and helpful during office hours.' },
  { id: 8, type: 'likert', question: 'Class Management', description: 'The instructor managed class time and activities effectively.' },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'Improvement Suggestion',
    description: 'What area could the instructor improve most?',
    options: ['More interactive activities', 'Better pace of instruction', 'More real-world examples', 'Clearer assignment instructions', 'More individual feedback'],
  },
  { id: 10, type: 'text', question: 'Instructor Feedback', description: "Please provide specific feedback about the instructor's teaching methods and effectiveness." },
];

const campusQualityQuestions = [
  { id: 1, type: 'star', question: 'Overall Campus Satisfaction', description: 'How would you rate your overall satisfaction with campus facilities?' },
  { id: 2, type: 'likert', question: 'Library Services', description: 'The library provides adequate resources and study spaces.' },
  { id: 3, type: 'likert', question: 'Computer Labs', description: 'Computer labs have sufficient equipment and are well-maintained.' },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Most Used Facility',
    description: 'Which campus facility do you use most frequently?',
    options: ['Library and study areas', 'Computer and technology labs', 'Student center and common areas', 'Dining facilities', 'Recreation and fitness center'],
  },
  { id: 5, type: 'likert', question: 'Dining Services', description: 'Campus dining options are satisfactory in quality and variety.' },
  { id: 6, type: 'likert', question: 'Internet Connectivity', description: 'WiFi and internet access across campus is reliable.' },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'Priority Improvement',
    description: 'Which area needs the most improvement?',
    options: ['More study spaces', 'Better technology equipment', 'Improved dining options', 'Enhanced recreational facilities', 'Better parking availability'],
  },
  { id: 8, type: 'likert', question: 'Cleanliness and Maintenance', description: 'Campus facilities are clean and well-maintained.' },
  { id: 9, type: 'likert', question: 'Accessibility', description: 'Campus facilities are accessible to students with disabilities.' },
  { id: 10, type: 'text', question: 'Facility Suggestions', description: 'Please suggest specific improvements for campus facilities or services.' },
];

// ---------------- Component ----------------

export function FeedbackForm({ navigate, currentUser, formType }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [followUpReason, setFollowUpReason] = useState('');

  const getQuestions = () => {
    if (formType === 'teaching-quality') return teachingQualityQuestions;
    if (formType === 'campus-quality') return campusQualityQuestions;
    return courseEvaluationQuestions;
  };

  const getFormTitle = () => {
    if (formType === 'course-evaluation') return 'Course Evaluation - CS 201';
    if (formType === 'teaching-quality') return 'Teaching Quality Assessment';
    if (formType === 'campus-quality') return 'Campus Facilities Feedback';
    return 'Feedback Form';
  };

  const getFormDescription = () => {
    if (formType === 'course-evaluation') return 'Data Structures and Algorithms - Professor Smith';
    if (formType === 'teaching-quality') return 'Professor Johnson - Database Systems';
    if (formType === 'campus-quality') return 'Help us improve library and lab facilities';
    return 'Please provide your feedback';
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleStarClick = (rating) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: rating }));
    setFollowUpVisible(rating <= 2);
  };

  const handleResponse = (value) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setFollowUpVisible(false);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setFollowUpVisible(false);
    }
  };

  const handleSubmit = () => {
    navigate('submission-confirmation', undefined, currentUser);
  };

  const isCurrentQuestionAnswered = () => {
    return responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-[#475569] hover:text-[#0F172A]"
            onClick={() => navigate('student-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">{getFormTitle()}</h1>
          <p className="text-[#475569]">{getFormDescription()}</p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#475569]">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-sm text-[#475569]">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                {currentQuestion.id}. {currentQuestion.question}
              </h3>
              {currentQuestion.description && <p className="text-[#475569]">{currentQuestion.description}</p>}
            </div>

            {/* Question Type Rendering */}
            <div className="mb-8">
              {currentQuestion.type === 'star' && (
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} type="button" onClick={() => handleStarClick(rating)} className="transition-colors">
                      <Star className={`w-8 h-8 ${rating <= (responses[currentQuestion.id] || 0)
                        ? 'text-[#F59E0B] fill-[#F59E0B]'
                        : 'text-[#E2E8F0]'
                        }`} />
                    </button>
                  ))}
                  <span className="ml-4 text-[#475569]">
                    {responses[currentQuestion.id] > 0 && `${responses[currentQuestion.id]} out of 5 stars`}
                  </span>
                </div>
              )}

              {currentQuestion.type === 'likert' && (
                <RadioGroup value={responses[currentQuestion.id] || ''} onValueChange={handleResponse}>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { value: 'strongly-disagree', label: 'Strongly Disagree' },
                      { value: 'disagree', label: 'Disagree' },
                      { value: 'neutral', label: 'Neutral' },
                      { value: 'agree', label: 'Agree' },
                      { value: 'strongly-agree', label: 'Strongly Agree' },
                    ].map((option) => (
                      <div key={option.value} className="flex flex-col items-center text-center">
                        <RadioGroupItem value={option.value} id={option.value} className="mb-2" />
                        <Label htmlFor={option.value} className="text-sm text-[#475569] cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === 'multiple-choice' && (
                <RadioGroup value={responses[currentQuestion.id] || ''} onValueChange={handleResponse}>
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`choice-${index}`} />
                        <Label htmlFor={`choice-${index}`} className="text-[#475569] cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === 'text' && (
                <Textarea
                  placeholder="Please share your detailed feedback..."
                  value={responses[currentQuestion.id] || ''}
                  onChange={(e) => handleResponse(e.target.value)}
                  className="min-h-[150px] border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]"
                />
              )}
            </div>

            {/* Follow-Up Question */}
            {followUpVisible && currentQuestion.type === 'star' && (
              <div className="mb-8 p-6 bg-[#FEF3C7] border border-[#F59E0B] rounded-xl">
                <h4 className="font-semibold text-[#0F172A] mb-2">Follow-up Question</h4>
                <p className="text-[#475569] mb-4">
                  We're sorry to hear you had a less than ideal experience. Could you help us understand what went wrong?
                </p>
                <Textarea
                  placeholder="Please share specific areas for improvement..."
                  value={followUpReason}
                  onChange={(e) => setFollowUpReason(e.target.value)}
                  className="min-h-[120px] border-[#F59E0B] focus:border-[#F59E0B] focus:ring-[#F59E0B]"
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered()}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
              >
                {currentQuestionIndex === questions.length - 1 ? (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

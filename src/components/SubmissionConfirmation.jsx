import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Heart, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function SubmissionConfirmation({ navigate, currentUser, completeForm, selectedFormType }) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    
    // Mark the form as completed when this component mounts
    const getFormDetails = () => {
      switch (selectedFormType) {
        case 'course-evaluation':
          return { id: 1, title: 'Course Evaluation - CS 201' };
        case 'teaching-quality':
          return { id: 2, title: 'Teaching Quality Assessment' };
        case 'campus-quality':
          return { id: 3, title: 'Campus Facilities Feedback' };
        default:
          return { id: 1, title: 'Feedback Form' };
      }
    };

    const formDetails = getFormDetails();
    completeForm(formDetails.id, formDetails.title, selectedFormType);
  }, [selectedFormType]);

  const floatingIcons = [
    { Icon: Heart, delay: 0.2, x: -20, y: -30 },
    { Icon: Star, delay: 0.4, x: 20, y: -40 },
    { Icon: Sparkles, delay: 0.6, x: -30, y: -20 },
    { Icon: CheckCircle, delay: 0.8, x: 30, y: -35 },
  ];

  const getFormTitle = () => {
    switch (selectedFormType) {
      case 'course-evaluation':
        return 'Course Evaluation';
      case 'teaching-quality':
        return 'Teaching Quality Assessment';
      case 'campus-quality':
        return 'Campus Facilities Feedback';
      default:
        return 'Feedback Form';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 flex items-center justify-center p-8">
      <Card className="max-w-lg w-full p-12 bg-white shadow-xl border border-[#E2E8F0] rounded-2xl text-center relative overflow-hidden">
        {/* Animated Background Sparkles */}
        {showAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Success Icon with Animation */}
        <motion.div 
          className="flex justify-center mb-8 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-[#22C55E] to-[#16a34a] rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          {/* Floating Icons */}
          {floatingIcons.map(({ Icon, delay, x, y }, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0], 
                x: x, 
                y: y 
              }}
              transition={{
                duration: 2,
                delay: delay,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Icon className="w-6 h-6 text-[#2563EB]" />
            </motion.div>
          ))}
        </motion.div>

        {/* "We Heard You" Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
            We Heard You!
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#2563EB] to-[#22C55E] rounded-full mx-auto mb-6"
            style={{ maxWidth: "200px" }}
          />
        </motion.div>
        
        <motion.p 
          className="text-lg text-[#475569] font-['Inter'] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Thank you, <span className="font-semibold text-[#2563EB]">{currentUser?.name || 'Student'}</span>! 
          Your feedback has been successfully submitted and will help us improve the learning experience for everyone.
        </motion.p>

        {/* Submission Details */}
        <motion.div 
          className="bg-gradient-to-r from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-6 mb-8 border border-[#E2E8F0]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#475569] font-['Inter']">Form:</p>
              <p className="font-medium text-[#0F172A] font-['Inter']">{getFormTitle()}</p>
            </div>
            <div>
              <p className="text-[#475569] font-['Inter']">Submitted:</p>
              <p className="font-medium text-[#0F172A] font-['Inter']">Just now</p>
            </div>
            <div>
              <p className="text-[#475569] font-['Inter']">Reference:</p>
              <p className="font-medium text-[#0F172A] font-['Inter']">
                #FB2025-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
              </p>
            </div>
            <div>
              <p className="text-[#475569] font-['Inter']">Status:</p>
              <p className="font-medium text-[#22C55E] font-['Inter'] flex items-center">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-[#22C55E] rounded-full mr-2"
                />
                Complete
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div 
          className="bg-gradient-to-r from-[#DBEAFE] to-[#EBF8FF] border border-[#2563EB] rounded-xl p-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-sm text-[#2563EB] font-['Inter']">
             Your voice matters! Aggregated results will be available after collecting enough responses to ensure anonymity.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Button
            onClick={() => navigate('student-dashboard')}
            className="w-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white rounded-lg py-3 font-['Inter'] font-medium transform transition-transform hover:scale-105"
          >
            Back to Dashboard
          </Button>
          
          <Button
            onClick={() => navigate('aggregated-results')}
            variant="outline"
            className="w-full border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg py-3 font-['Inter'] font-medium transform transition-transform hover:scale-105"
          >
            View Past Results
          </Button>
        </motion.div>
      </Card>
    </div>
  );
}

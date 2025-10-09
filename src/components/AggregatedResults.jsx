import { memo } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Shield, Star, BarChart3, PieChart } from 'lucide-react';


const ratingData = [
  { rating: '5 Stars', count: 45, percentage: 45 },
  { rating: '4 Stars', count: 30, percentage: 30 },
  { rating: '3 Stars', count: 15, percentage: 15 },
  { rating: '2 Stars', count: 7, percentage: 7 },
  { rating: '1 Star', count: 3, percentage: 3 },
];

const methodData = [
  { method: 'Interactive Lectures', value: 40, color: '#2563EB' },
  { method: 'Hands-on Labs', value: 35, color: '#F59E0B' },
  { method: 'Group Projects', value: 15, color: '#22C55E' },
  { method: 'Individual Work', value: 10, color: '#EF4444' },
];

function AggregatedResultsComponent({ navigate }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-[#475569] hover:text-[#0F172A]"
            onClick={() => navigate('student-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
                Course Results
              </h1>
              <p className="text-[#475569] font-['Inter']">
                CS 101 - Introduction to Programming • Fall 2024
              </p>
            </div>
            <Badge className="bg-[#22C55E] text-white px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Anonymous Results
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Privacy Notice */}
          <Card className="p-6 bg-[#DBEAFE] border border-[#2563EB] rounded-2xl mb-8">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-[#2563EB] mr-3" />
              <div>
                <h3 className="font-semibold text-[#2563EB] font-['Poppins'] mb-1">
                  Privacy Protected
                </h3>
                <p className="text-sm text-[#2563EB] font-['Inter']">
                  Results are visible after 5+ responses. Individual responses remain completely anonymous.
                </p>
              </div>
            </div>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">4.2</p>
                </div>
                <div className="w-12 h-12 bg-[#F59E0B] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4 ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#E2E8F0]'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-[#475569] font-['Inter']">out of 5</span>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Total Responses</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">100</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
              <p className="text-sm text-[#22C55E] font-['Inter'] mt-2">
                ↗ +15% from last semester
              </p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Response Rate</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">85%</p>
                </div>
                <div className="w-12 h-12 bg-[#22C55E] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-[#22C55E]" />
                </div>
              </div>
              <p className="text-sm text-[#475569] font-['Inter'] mt-2">
                100 out of 118 students
              </p>
            </Card>
          </div>

          {/* Simple Rating Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                Rating Distribution
              </h3>
              <div className="space-y-4">
                {ratingData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-20 text-sm text-[#475569] font-['Inter']">{item.rating}</div>
                    <div className="flex-1 bg-[#E2E8F0] rounded-full h-3 mx-4">
                      <div
                        className="bg-[#2563EB] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-[#475569] font-['Inter'] text-right">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                Preferred Learning Methods
              </h3>
              <div className="space-y-4">
                {methodData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#475569] font-['Inter']">{item.method}</span>
                        <span className="text-sm font-medium text-[#0F172A] font-['Inter']">
                          {item.value}%
                        </span>
                      </div>
                      <div className="bg-[#E2E8F0] rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Summary Insights */}
          <Card className="p-8 bg-white border border-[#E2E8F0] rounded-2xl">
            <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
              Key Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-[#475569] font-['Inter']">
                    <span className="font-medium text-[#0F172A]">75% of students</span> rated the course 4 stars or above
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-[#475569] font-['Inter']">
                    <span className="font-medium text-[#0F172A]">Interactive lectures</span> were the most preferred teaching method
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-[#475569] font-['Inter']">
                    <span className="font-medium text-[#0F172A]">Response rate improved</span> by 15% compared to last semester
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#EF4444] rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-[#475569] font-['Inter']">
                    Only <span className="font-medium text-[#0F172A]">10% rated below 3 stars</span> indicating high satisfaction
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const AggregatedResults = memo(AggregatedResultsComponent);

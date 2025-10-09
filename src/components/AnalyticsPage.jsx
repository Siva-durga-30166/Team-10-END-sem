import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { ArrowLeft, TrendingUp, Users, MessageSquare, Star, Filter } from 'lucide-react';
import { ActionLogger, createActionLogEntry } from '../utils/actionLogger';
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const ratingData = [
  { rating: '5 Stars', count: 45, percentage: 45 },
  { rating: '4 Stars', count: 30, percentage: 30 },
  { rating: '3 Stars', count: 15, percentage: 15 },
  { rating: '2 Stars', count: 7, percentage: 7 },
  { rating: '1 Star', count: 3, percentage: 3 },
];

const trendData = [
  { week: 'Week 1', rating: 3.8, responses: 20 },
  { week: 'Week 2', rating: 4.1, responses: 35 },
  { week: 'Week 3', rating: 4.3, responses: 42 },
  { week: 'Week 4', rating: 4.2, responses: 45 },
];

const comments = [
  { id: 1, text: "Great course structure and clear explanations. The hands-on examples really helped me understand the concepts.", rating: 5, date: "2025-01-20" },
  { id: 2, text: "Could use more practical exercises, but overall very informative.", rating: 4, date: "2025-01-19" },
  { id: 3, text: "Excellent teaching style. Professor is very responsive to questions.", rating: 5, date: "2025-01-18" },
  { id: 4, text: "Some topics were covered too quickly. Would appreciate more time on complex algorithms.", rating: 3, date: "2025-01-17" },
];


export function AnalyticsPage({ navigate, currentUser }) {
  
  const [counterfactualRating, setCounterfactualRating] = useState([4.2]);

  useEffect(() => {
    if (currentUser) {
      
      ActionLogger.logAction(
        createActionLogEntry(
          currentUser.id,
          currentUser.name,
          "ANALYTICS_VIEWED",
          "Accessed analytics dashboard to view student feedback data",
          "analytics",
          "main-dashboard"
        )
      );
    }
  }, [currentUser]);

  const calculateCounterfactual = (newRating) => {
    const currentAvg = 4.2;
    const totalResponses = 100;
    const difference = newRating - currentAvg;
    const impactedResponses = Math.round(totalResponses * 0.3); // Assume 30% would change

    return {
      newAverage: newRating,
      responseChange: difference > 0 ? `+${impactedResponses}` : `-${impactedResponses}`,
      percentageChange: ((difference / currentAvg) * 100).toFixed(1),
    };
  };

  const counterfactual = calculateCounterfactual(counterfactualRating[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="max-w-7xl mx-auto">
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
                Analytics Dashboard
              </h1>
              <p className="text-[#475569] font-['Inter']">
                CS 201 - Data Structures and Algorithms
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-[#E2E8F0]">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Badge className="bg-[#22C55E] text-white px-4 py-2">
                100 Responses
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <p className="text-sm text-[#22C55E] font-['Inter'] mt-2">
                ↗ +0.3 from last period
              </p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Response Rate</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">87%</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
              <p className="text-sm text-[#475569] font-['Inter'] mt-2">
                100 of 115 students
              </p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Positive Feedback</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">75%</p>
                </div>
                <div className="w-12 h-12 bg-[#22C55E] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#22C55E]" />
                </div>
              </div>
              <p className="text-sm text-[#22C55E] font-['Inter'] mt-2">
                4+ star ratings
              </p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Comments</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">68</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
              <p className="text-sm text-[#475569] font-['Inter'] mt-2">
                68% with comments
              </p>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Rating Distribution */}
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                Rating Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RBarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="rating"
                    tick={{ fontSize: 12, fill: '#475569' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#475569' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </RBarChart>
              </ResponsiveContainer>
            </Card>

            {/* Trend Analysis */}
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                Rating Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 12, fill: '#475569' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    domain={[0, 5]}
                    tick={{ fontSize: 12, fill: '#475569' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Comments and Counterfactual */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Comments List */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                  Recent Comments
                </h3>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= comment.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#E2E8F0]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-[#475569] font-['Inter']">{comment.date}</span>
                      </div>
                      <p className="text-[#475569] font-['Inter']">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Counterfactual Analysis */}
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                What If Analysis
              </h3>
              <p className="text-sm text-[#475569] font-['Inter'] mb-4">
                Simulate how changes might affect your ratings
              </p>

              <div className="space-y-4">
                <div>
                  <Label className="text-[#0F172A] font-['Inter'] font-medium mb-2 block">
                    Target Rating: {counterfactualRating[0].toFixed(1)}
                  </Label>
                  <Slider
                    value={counterfactualRating}
                    onValueChange={setCounterfactualRating}
                    min={1}
                    max={5}
                    step={0.1}
                    className="mb-4"
                  />
                </div>

                <div className="bg-[#F8FAFC] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#475569] font-['Inter']">Current Avg:</span>
                    <span className="font-medium text-[#0F172A] font-['Inter']">4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#475569] font-['Inter']">Target Avg:</span>
                    <span className="font-medium text-[#2563EB] font-['Inter']">
                      {counterfactual.newAverage.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#475569] font-['Inter']">Change:</span>
                    <span
                      className={`font-medium font-['Inter'] ${
                        parseFloat(counterfactual.percentageChange) > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {counterfactual.percentageChange}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#475569] font-['Inter']">
                  This simulation helps you understand the potential impact of course improvements.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

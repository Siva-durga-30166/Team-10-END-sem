import { memo, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Shield, TrendingUp, Users, AlertTriangle, Settings, Download, BarChart3, PieChart as PieChartIcon, FileText, Table as TableIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';


const participationData = [
  { department: 'Computer Science', participation: 92, total: 450, atRisk: false },
  { department: 'Mathematics', participation: 87, total: 320, atRisk: false },
  { department: 'Physics', participation: 74, total: 280, atRisk: false },
  { department: 'Chemistry', participation: 65, total: 290, atRisk: true },
  { department: 'Biology', participation: 58, total: 380, atRisk: true },
  { department: 'Engineering', participation: 45, total: 520, atRisk: true },
];

const studentTypeData = [
  { type: 'Undergraduate', value: 75, color: '#2563EB', count: 3420 },
  { type: 'Postgraduate', value: 25, color: '#F59E0B', count: 1140 },
];

const departmentRatings = [
  { department: 'CS', rating: 4.5 },
  { department: 'Math', rating: 4.2 },
  { department: 'Physics', rating: 4.1 },
  { department: 'Chemistry', rating: 3.8 },
  { department: 'Biology', rating: 3.6 },
  { department: 'Engineering', rating: 3.4 },
];


function InstitutionDashboardComponent({ navigate }) {
  const overallParticipation = 71;
  const averageRating = 4.0;
  const atRiskDepartments = participationData.filter(d => d.atRisk).length;

  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFilters, setExportFilters] = useState({
    includeSummary: true,
    includeStudentDistribution: true,
    includeDepartmentDetails: true,
    includeOnlyAtRisk: false,
  });

  const exportCSV = () => {
    try {
      const csvRows = [];

      // Header
      csvRows.push('INSTITUTION FEEDBACK SYSTEM - ANALYTICS REPORT');
      csvRows.push(`Report Generated: ${new Date().toLocaleString()}`);
      csvRows.push('');

      // Summary
      if (exportFilters.includeSummary) {
        csvRows.push('SUMMARY STATISTICS');
        csvRows.push('Metric,Value');
        csvRows.push(`Overall Participation Rate,${overallParticipation}%`);
        csvRows.push(`Average Rating,${averageRating}`);
        csvRows.push(`At-Risk Departments,${atRiskDepartments}`);
        csvRows.push('');
      }

      // Student Distribution
      if (exportFilters.includeStudentDistribution) {
        csvRows.push('STUDENT DISTRIBUTION');
        csvRows.push('Type,Count,Percentage');
        studentTypeData.forEach(item => {
          csvRows.push(`${item.type},${item.count},${item.value}%`);
        });
        csvRows.push('');
      }

      // Department Details
      if (exportFilters.includeDepartmentDetails) {
        csvRows.push('DEPARTMENT PERFORMANCE DETAILS');
        csvRows.push('Department,Participation Rate,Average Rating,Total Students,Status');

        const dataToExport = exportFilters.includeOnlyAtRisk
          ? participationData.filter(d => d.atRisk)
          : participationData;

        dataToExport.forEach((dept) => {
          const index = participationData.findIndex(d => d.department === dept.department);
          const rating = departmentRatings[index]?.rating || 'N/A';
          const status = dept.atRisk ? 'At Risk' : 'Healthy';
          csvRows.push(`${dept.department},${dept.participation}%,${rating},${dept.total},${status}`);
        });
      }

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().split('T')[0];

      link.setAttribute('href', url);
      link.setAttribute('download', `institution-report-${dateStr}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportDialogOpen(false);
      toast.success('Report exported successfully!', {
        description: `CSV file downloaded as institution-report-${dateStr}.csv`,
      });
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error exporting the report. Please try again.',
      });
    }
  };

  const exportPDF = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error('Export failed', {
          description: 'Please allow popups to export PDF reports.',
        });
        return;
      }

      const dataToExport = exportFilters.includeOnlyAtRisk
        ? participationData.filter(d => d.atRisk)
        : participationData;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Institution Analytics Report</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #0F172A; max-width: 1200px; margin: 0 auto; }
            h1 { font-family: 'Poppins', sans-serif; color: #0F172A; border-bottom: 3px solid #2563EB; padding-bottom: 16px; margin-bottom: 24px; }
            h2 { font-family: 'Poppins', sans-serif; color: #2563EB; margin-top: 32px; margin-bottom: 16px; }
            .meta { color: #475569; margin-bottom: 32px; font-size: 14px; }
            .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }
            .summary-card { background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; }
            .summary-label { color: #475569; font-size: 14px; margin-bottom: 8px; }
            .summary-value { font-family: 'Poppins', sans-serif; font-size: 32px; color: #0F172A; font-weight: 700; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 32px; }
            th { background: #F8FAFC; padding: 12px; text-align: left; font-weight: 600; color: #475569; border-bottom: 2px solid #E2E8F0; }
            td { padding: 12px; border-bottom: 1px solid #E2E8F0; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; }
            .badge-healthy { background: #22C55E; color: white; }
            .badge-risk { background: #EF4444; color: white; }
            .student-dist { display: flex; gap: 24px; margin-top: 16px; }
            .student-type { flex: 1; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; }
            .student-count { font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 700; color: #0F172A; }
            @media print { body { padding: 20px; } .summary-grid { page-break-inside: avoid; } table { page-break-inside: avoid; } }
          </style>
        </head>
        <body>
          <h1>Institution Feedback System - Analytics Report</h1>
          <div class="meta">Report Generated: ${new Date().toLocaleString()}</div>

          ${exportFilters.includeSummary ? `
            <h2>Summary Statistics</h2>
            <div class="summary-grid">
              <div class="summary-card">
                <div class="summary-label">Participation Rate</div>
                <div class="summary-value">${overallParticipation}%</div>
              </div>
              <div class="summary-card">
                <div class="summary-label">Average Rating</div>
                <div class="summary-value">${averageRating}</div>
              </div>
              <div class="summary-card">
                <div class="summary-label">At-Risk Departments</div>
                <div class="summary-value">${atRiskDepartments}</div>
              </div>
            </div>
          ` : ''}

          ${exportFilters.includeStudentDistribution ? `
            <h2>Student Distribution</h2>
            <div class="student-dist">
              ${studentTypeData.map(item => `
                <div class="student-type">
                  <div class="summary-label">${item.type}</div>
                  <div class="student-count">${item.count}</div>
                  <div style="color: #475569; margin-top: 4px;">${item.value}% of total</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${exportFilters.includeDepartmentDetails ? `
            <h2>Department Performance Overview</h2>
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Participation</th>
                  <th>Avg Rating</th>
                  <th>Total Students</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${dataToExport.map((dept) => {
                  const index = participationData.findIndex(d => d.department === dept.department);
                  const rating = departmentRatings[index]?.rating || 'N/A';
                  return `
                    <tr>
                      <td><strong>${dept.department}</strong></td>
                      <td>${dept.participation}%</td>
                      <td>${rating}</td>
                      <td>${dept.total}</td>
                      <td>
                        <span class="badge ${dept.atRisk ? 'badge-risk' : 'badge-healthy'}">
                          ${dept.atRisk ? 'At Risk' : 'Healthy'}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          ` : ''}

        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };

      setExportDialogOpen(false);
      toast.success('PDF report opened!', {
        description: "Use your browser's print dialog to save as PDF.",
      });
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error generating the PDF. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] font-['Poppins']">Institution Portal</span>
            </div>

            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-[#22C55E] font-['Inter'] font-medium">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => navigate('settings')}
                className="flex items-center space-x-2 text-[#475569] hover:text-[#22C55E] font-['Inter'] font-medium"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-[#E2E8F0]">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-['Poppins']">Export Analytics Report</DialogTitle>
                  <DialogDescription className="font-['Inter']">
                    Customize your report and choose your preferred export format.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Export Filters */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-[#0F172A] font-['Inter']">Include in Report</h4>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="summary"
                          checked={exportFilters.includeSummary}
                          onCheckedChange={(checked) =>
                            setExportFilters(prev => ({ ...prev, includeSummary: !!checked }))
                          }
                        />
                        <Label htmlFor="summary" className="text-sm font-['Inter'] cursor-pointer">
                          Summary Statistics
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="distribution"
                          checked={exportFilters.includeStudentDistribution}
                          onCheckedChange={(checked) =>
                            setExportFilters(prev => ({ ...prev, includeStudentDistribution: !!checked }))
                          }
                        />
                        <Label htmlFor="distribution" className="text-sm font-['Inter'] cursor-pointer">
                          Student Distribution
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="departments"
                          checked={exportFilters.includeDepartmentDetails}
                          onCheckedChange={(checked) =>
                            setExportFilters(prev => ({ ...prev, includeDepartmentDetails: !!checked }))
                          }
                        />
                        <Label htmlFor="departments" className="text-sm font-['Inter'] cursor-pointer">
                          Department Performance Details
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <Checkbox
                          id="atRiskOnly"
                          checked={exportFilters.includeOnlyAtRisk}
                          disabled={!exportFilters.includeDepartmentDetails}
                          onCheckedChange={(checked) =>
                            setExportFilters(prev => ({ ...prev, includeOnlyAtRisk: !!checked }))
                          }
                        />
                        <Label htmlFor="atRiskOnly" className="text-sm font-['Inter'] cursor-pointer text-[#475569]">
                          Only At-Risk Departments
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Export Format Buttons */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[#0F172A] font-['Inter']">Export Format</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={exportCSV} className="bg-[#2563EB] hover:bg-[#1D4ED8] font-['Inter']">
                        <TableIcon className="w-4 h-4 mr-2" />
                        Export as CSV
                      </Button>
                      <Button
                        onClick={exportPDF}
                        variant="outline"
                        className="border-[#2563EB] text-[#2563EB] hover:bg-[#DBEAFE] font-['Inter']"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export as PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">Institution Analytics</h1>
            <p className="text-[#475569] font-['Inter']">
              Monitor feedback participation and satisfaction across all departments
            </p>
          </div>

          {/* Alert for Low Participation */}
          {atRiskDepartments > 0 && (
            <Alert className="mb-8 border-[#EF4444] bg-[#FEF2F2]">
              <AlertTriangle className="h-4 w-4 text-[#EF4444]" />
              <AlertDescription className="text-[#EF4444] font-['Inter']">
                <strong>{atRiskDepartments} departments</strong> have participation rates below 60%.
                Consider targeted outreach to improve engagement.
              </AlertDescription>
            </Alert>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Participation Rate</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">{overallParticipation}%</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
              <p className="text-sm text-[#EF4444] font-['Inter'] mt-2">↓ -5% from last semester</p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">{averageRating}</p>
                </div>
                <div className="w-12 h-12 bg-[#F59E0B] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
              <p className="text-sm text-[#22C55E] font-['Inter'] mt-2">↗ +0.2 from last semester</p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#475569] font-['Inter'] mb-1">At-risk Departments</p>
                  <p className="text-3xl font-bold text-[#0F172A] font-['Poppins']">{atRiskDepartments}</p>
                </div>
                <div className="w-12 h-12 bg-[#EF4444] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
                </div>
              </div>
              <p className="text-sm text-[#475569] font-['Inter'] mt-2">Participation below 60%</p>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Participation by Department */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
                <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
                  Department Participation Rates
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={[
                      { department: 'Computer Science', participation: 92, atRisk: false },
                      { department: 'Mathematics', participation: 87, atRisk: false },
                      { department: 'Physics', participation: 74, atRisk: false },
                      { department: 'Chemistry', participation: 65, atRisk: false },
                      { department: 'Biology', participation: 58, atRisk: true },
                      { department: 'Engineering', participation: 45, atRisk: true },
                    ]}
                    layout="horizontal"
                    margin={{ top: 5, right: 30, left: 5, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 12, fill: '#475569', fontFamily: 'Inter' }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={{ stroke: '#E2E8F0' }}
                    />
                    <YAxis
                      dataKey="department"
                      type="category"
                      width={140}
                      tick={{ fontSize: 12, fill: '#475569', fontFamily: 'Inter' }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={{ stroke: '#E2E8F0' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        fontFamily: 'Inter',
                        padding: '8px 12px',
                      }}
                      formatter={(value) => [`${value}%`, 'Participation']}
                      labelStyle={{ color: '#0F172A', fontWeight: 600, marginBottom: '4px' }}
                    />
                    <Bar dataKey="participation" fill="#22C55E" radius={[0, 8, 8, 0]} barSize={32}>
                      <Cell fill="#22C55E" />
                      <Cell fill="#22C55E" />
                      <Cell fill="#22C55E" />
                      <Cell fill="#22C55E" />
                      <Cell fill="#EF4444" />
                      <Cell fill="#EF4444" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Student Type Distribution */}
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">Student Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={studentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {studentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                    formatter={(value, name) => [`${value}% (${studentTypeData.find(d => d.type === name)?.count})`, 'Students']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {studentTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-[#475569] font-['Inter']">{item.type}</span>
                    </div>
                    <span className="text-sm font-medium text-[#0F172A] font-['Inter']">{item.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Department Performance Table */}
          <Card className="bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">Department Performance Overview</h2>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 font-medium text-[#475569] font-['Inter']">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-[#475569] font-['Inter']">Participation</th>
                      <th className="text-left py-3 px-4 font-medium text-[#475569] font-['Inter']">Avg Rating</th>
                      <th className="text-left py-3 px-4 font-medium text-[#475569] font-['Inter']">Total Students</th>
                      <th className="text-left py-3 px-4 font-medium text-[#475569] font-['Inter']">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participationData.map((dept, index) => (
                      <tr key={dept.department} className="border-b border-[#E2E8F0] last:border-b-0">
                        <td className="py-4 px-4 font-medium text-[#0F172A] font-['Inter']">{dept.department}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-20 bg-[#E2E8F0] rounded-full h-2 mr-3">
                              <div
                                className={`h-2 rounded-full ${
                                  dept.participation >= 80
                                    ? 'bg-[#22C55E]'
                                    : dept.participation >= 60
                                    ? 'bg-[#F59E0B]'
                                    : 'bg-[#EF4444]'
                                }`}
                                style={{ width: `${dept.participation}%` }}
                              />
                            </div>
                            <span className="text-sm text-[#475569] font-['Inter']">{dept.participation}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#475569] font-['Inter']">
                          {departmentRatings[index]?.rating || 'N/A'}
                        </td>
                        <td className="py-4 px-4 text-[#475569] font-['Inter']">{dept.total}</td>
                        <td className="py-4 px-4">
                          <Badge className={`${dept.atRisk ? 'bg-[#EF4444] text-white' : 'bg-[#22C55E] text-white'}`}>
                            {dept.atRisk ? 'At Risk' : 'Healthy'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const InstitutionDashboard = memo(InstitutionDashboardComponent);

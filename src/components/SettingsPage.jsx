import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ArrowLeft, Download, Save, FileText, Database, Shield, Bell } from 'lucide-react';

export function SettingsPage({ navigate }) {
  const [settings, setSettings] = useState({
    anonymityEnabled: true,
    minimumResponses: 5,
    autoReminders: true,
    publicResults: false,
    dataRetention: '2-years',
    exportFormat: 'csv',
    notificationEmail: 'admin@university.edu'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
  };

  const handleExportData = (format) => {
    console.log(`Exporting data as ${format}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-[#475569] hover:text-[#0F172A]"
            onClick={() => navigate('institution-dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] font-['Poppins'] mb-2">
                System Settings
              </h1>
              <p className="text-[#475569] font-['Inter']">
                Configure feedback system preferences and data management
              </p>
            </div>
            <Button 
              onClick={handleSaveSettings}
              className="bg-[#22C55E] hover:bg-[#16a34a] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Privacy & Anonymity Settings */}
          <Card className="p-8 bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-[#2563EB] mr-3" />
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">
                Privacy & Anonymity
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[#0F172A] font-['Inter'] font-medium">
                    Anonymous Responses
                  </Label>
                  <p className="text-sm text-[#475569] font-['Inter'] mt-1">
                    Ensure all student responses remain completely anonymous
                  </p>
                </div>
                <Switch
                  checked={settings.anonymityEnabled}
                  onCheckedChange={(checked) => updateSetting('anonymityEnabled', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[#0F172A] font-['Inter'] font-medium">
                    Public Results Visibility
                  </Label>
                  <p className="text-sm text-[#475569] font-['Inter'] mt-1">
                    Allow students to view aggregated results after submission
                  </p>
                </div>
                <Switch
                  checked={settings.publicResults}
                  onCheckedChange={(checked) => updateSetting('publicResults', checked)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[#0F172A] font-['Inter'] font-medium">
                    Minimum Responses for Visibility
                  </Label>
                  <p className="text-sm text-[#475569] font-['Inter'] mt-1 mb-3">
                    Results only shown after this many responses to protect anonymity
                  </p>
                  <Input
                    type="number"
                    value={settings.minimumResponses}
                    onChange={(e) => updateSetting('minimumResponses', parseInt(e.target.value))}
                    min="1"
                    max="50"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-[#0F172A] font-['Inter'] font-medium">
                    Data Retention Period
                  </Label>
                  <p className="text-sm text-[#475569] font-['Inter'] mt-1 mb-3">
                    How long to keep feedback data before automatic deletion
                  </p>
                  <Select 
                    value={settings.dataRetention} 
                    onValueChange={(value) => updateSetting('dataRetention', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                      <SelectItem value="3-years">3 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-8 bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-[#F59E0B] mr-3" />
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">
                Notifications
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[#0F172A] font-['Inter'] font-medium">
                    Automatic Reminders
                  </Label>
                  <p className="text-sm text-[#475569] font-['Inter'] mt-1">
                    Send reminder emails to students for pending feedback forms
                  </p>
                </div>
                <Switch
                  checked={settings.autoReminders}
                  onCheckedChange={(checked) => updateSetting('autoReminders', checked)}
                />
              </div>

              <Separator />

              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">
                  Notification Email
                </Label>
                <p className="text-sm text-[#475569] font-['Inter'] mt-1 mb-3">
                  Email address for system notifications and reports
                </p>
                <Input
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => updateSetting('notificationEmail', e.target.value)}
                  placeholder="admin@university.edu"
                  className="max-w-md"
                />
              </div>
            </div>
          </Card>

          {/* Data Export */}
          <Card className="p-8 bg-white border border-[#E2E8F0] rounded-2xl">
            <div className="flex items-center mb-6">
              <Database className="w-6 h-6 text-[#22C55E] mr-3" />
              <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins']">
                Data Export
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-[#0F172A] font-['Inter'] font-medium">
                  Default Export Format
                </Label>
                <p className="text-sm text-[#475569] font-['Inter'] mt-1 mb-3">
                  Choose the default format for data exports
                </p>
                <Select 
                  value={settings.exportFormat} 
                  onValueChange={(value) => updateSetting('exportFormat', value)}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                    <SelectItem value="pdf">PDF (Report)</SelectItem>
                    <SelectItem value="json">JSON (Data)</SelectItem>
                    <SelectItem value="xlsx">Excel (Workbook)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-[#0F172A] font-['Inter'] mb-4">
                  Export Data
                </h3>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleExportData('csv')}
                    variant="outline" 
                    className="border-[#E2E8F0]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button 
                    onClick={() => handleExportData('pdf')}
                    variant="outline" 
                    className="border-[#E2E8F0]"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Export PDF Report
                  </Button>
                </div>
                <p className="text-sm text-[#475569] font-['Inter'] mt-3">
                  Exports will include all feedback data from the current academic year while maintaining anonymity.
                </p>
              </div>
            </div>
          </Card>

          {/* System Information */}
          <Card className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
            <h2 className="text-xl font-semibold text-[#0F172A] font-['Poppins'] mb-6">
              System Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-2">Current Version</h4>
                <p className="text-[#475569] font-['Inter']">v2.1.3 (Latest)</p>
              </div>
              <div>
                <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-2">Last Backup</h4>
                <p className="text-[#475569] font-['Inter']">January 22, 2025 at 2:30 AM</p>
              </div>
              <div>
                <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-2">Total Responses</h4>
                <p className="text-[#475569] font-['Inter']">15,847 this academic year</p>
              </div>
              <div>
                <h4 className="font-medium text-[#0F172A] font-['Inter'] mb-2">Storage Usage</h4>
                <p className="text-[#475569] font-['Inter']">2.3 GB of 10 GB available</p>
              </div>
            </div>
          </Card>

          {/* Save Changes Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleSaveSettings}
              className="px-8 py-3 bg-[#22C55E] hover:bg-[#16a34a] text-white"
            >
              <Save className="w-5 h-5 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

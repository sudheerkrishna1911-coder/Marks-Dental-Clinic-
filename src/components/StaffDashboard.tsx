import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Calendar, MessageSquare, Search, Lock, Unlock, 
  Trash2, RefreshCw, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle, Sparkles, Filter 
} from 'lucide-react';
import { Appointment, ContactMessage } from '../types';

export default function StaffDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active view
  const [dashboardTab, setDashboardTab] = useState<'Appointments' | 'Inquiries'>('Appointments');

  // Search/Filter parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // State data loads
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // System notification toast
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadLocalStoreData();
  }, []);

  const loadLocalStoreData = () => {
    const rawApts = localStorage.getItem('mark_clinic_appointments');
    const rawMsgs = localStorage.getItem('mark_clinic_messages');
    
    setAppointments(rawApts ? JSON.parse(rawApts) : []);
    setMessages(rawMsgs ? JSON.parse(rawMsgs) : []);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '9999') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect authorization PIN. Try "1234" to enter.');
    }
  };

  // Seed sample records so that the workspace is filled with initial content
  const handleSeedDemorecords = () => {
    const mockAppointments: Appointment[] = [
      {
        id: 'apt-demo-1',
        fullName: 'Bishnu Prasad Rabha',
        phoneNumber: '+91 9864201344',
        email: 'bishnu.rabha@gmail.com',
        preferredDate: '2026-06-18',
        preferredTime: 'Morning (9 AM - 12 PM)',
        treatmentRequired: 'Dental Implants',
        message: 'Looking to replace two lower left posterior molars. Requesting MDS implantologist consult.',
        status: 'Pending',
        createdAt: '14 Jun 2026, 10:15 AM'
      },
      {
        id: 'apt-demo-2',
        fullName: 'Janamoni Gogoi',
        phoneNumber: '+91 9954032120',
        email: 'janamoni@yahoo.com',
        preferredDate: '2026-06-19',
        preferredTime: 'Evening (3 PM - 6 PM)',
        treatmentRequired: 'Orthodontics & Braces',
        message: 'Query regarding invisible dental aligners. Aligning teeth timeline.',
        status: 'Confirmed',
        createdAt: '13 Jun 2026, 04:30 PM'
      },
      {
        id: 'apt-demo-3',
        fullName: 'Nayanmoni Saikia',
        phoneNumber: '+91 7002134599',
        email: 'nayanmoni.gold@rediffmail.com',
        preferredDate: '2026-06-20',
        preferredTime: 'Midday (12 PM - 3 PM)',
        treatmentRequired: 'Root Canal Treatment',
        message: 'Severe throbbing pain in upper left jaw. Requires single sitting therapy relief.',
        status: 'Pending',
        createdAt: '14 Jun 2026, 12:05 PM'
      }
    ];

    const mockMessages: ContactMessage[] = [
      {
        id: 'msg-demo-1',
        fullName: 'Upasana Borkotoky',
        email: 'upasana@outlook.com',
        phoneNumber: '+91 8876020120',
        message: 'Do you offer dental whitening treatment plans for bridal smiling makeovers? What is the cost package?',
        status: 'Unread',
        createdAt: '14 Jun 2026, 08:30 AM'
      },
      {
        id: 'msg-demo-2',
        fullName: 'Pranjal Baruah',
        email: 'baruah.p@gmail.com',
        phoneNumber: '+91 9435012355',
        message: 'Emergency question: Do you accept appointments on Sundays for root canal trauma cases?',
        status: 'Unread',
        createdAt: '12 Jun 2026, 09:15 PM'
      }
    ];

    localStorage.setItem('mark_clinic_appointments', JSON.stringify(mockAppointments));
    localStorage.setItem('mark_clinic_messages', JSON.stringify(mockMessages));
    
    setAppointments(mockAppointments);
    setMessages(mockMessages);
    showToast('Successfully seeded sample clinic data!');
  };

  const handleClearAllRecords = () => {
    localStorage.removeItem('mark_clinic_appointments');
    localStorage.removeItem('mark_clinic_messages');
    setAppointments([]);
    setMessages([]);
    showToast('Cleared all storage data.');
  };

  const handleUpdateAptStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return { ...apt, status: newStatus };
      }
      return apt;
    });
    setAppointments(updated);
    localStorage.setItem('mark_clinic_appointments', JSON.stringify(updated));
    showToast(`Updated appointment status to ${newStatus}`);
  };

  const handleToggleMsgStatus = (id: string) => {
    const updated = messages.map((msg) => {
      if (msg.id === id) {
        const nextStatus: ContactMessage['status'] = msg.status === 'Unread' ? 'Replied' : 'Unread';
        return { ...msg, status: nextStatus };
      }
      return msg;
    });
    setMessages(updated);
    localStorage.setItem('mark_clinic_messages', JSON.stringify(updated));
    showToast('Toggled inquiry message response log');
  };

  const handleDeleteApt = (id: string) => {
    const filtered = appointments.filter((apt) => apt.id !== id);
    setAppointments(filtered);
    localStorage.setItem('mark_clinic_appointments', JSON.stringify(filtered));
    showToast('Appointment record deleted successfully.');
  };

  const handleDeleteMsg = (id: string) => {
    const filtered = messages.filter((msg) => msg.id !== id);
    setMessages(filtered);
    localStorage.setItem('mark_clinic_messages', JSON.stringify(filtered));
    showToast('Inquiry message record deleted.');
  };

  const showToast = (txt: string) => {
    setToastMessage(txt);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Searching & Filtering Calculations
  const filteredAppointments = appointments.filter((apt) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = 
      apt.fullName.toLowerCase().includes(query) ||
      apt.phoneNumber.includes(query) ||
      apt.email.toLowerCase().includes(query) ||
      apt.treatmentRequired.toLowerCase().includes(query);
      
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && apt.status === statusFilter;
  });

  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      msg.fullName.toLowerCase().includes(query) ||
      msg.phoneNumber.includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query);

    return matchesSearch;
  });

  // Calculate quick analytic stats
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;

  return (
    <div className="w-full bg-[#0a0f18] text-white py-12 md:py-24 px-4 font-sans">
      
      {/* Toast Alert Indicator */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#0d1522] border border-[#D4AF37]/20 text-teal-400 font-sans text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col gap-2 bg-[#0a0f18]">
        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">Internal System</span>
        <h2 className="font-serif font-light text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center gap-2">
          <ShieldCheck className="w-7 h-7 text-teal-400" /> Clinic Management Portal
        </h2>
        <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto rounded-full mt-1" />
        <p className="font-sans text-gray-450 text-gray-400 text-xs sm:text-sm mt-1">
          A secure client-side dashboard for doctors and administrative staff to process appointments, coordinate schedules, and review patient messages.
        </p>
      </div>

      {!isAuthenticated ? (
        /* Private portal sign-in PIN box */
        <div className="max-w-md mx-auto bg-[#0d1522] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-150 text-white">
          <div className="flex flex-col items-center gap-4 text-center mb-6">
            <div className="w-12 h-12 bg-[#0a0f18] text-teal-400 rounded-full flex items-center justify-center border border-white/5">
              <Lock className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h3 className="font-serif text-[#D4AF37] text-lg font-light">Staff Authorization Required</h3>
              <p className="font-sans text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
                Authorized clinicians please input the staff credential PIN below.
              </p>
            </div>
          </div>

          <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-sans font-bold text-teal-400 text-[10px] uppercase tracking-widest text-center">
                Staff Authentication PIN:
              </label>
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (1234)"
                className="w-full text-center font-mono font-bold text-lg tracking-widest py-2.5 px-3 bg-white/[0.02] border border-white/10 text-white rounded-xl outline-none focus:bg-[#0a0f18] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
              <span className="text-[10px] text-gray-500 font-sans mt-1.5 text-center block">
                * Note: Use default bypass PIN <strong>1234</strong> or <strong>9999</strong> to explore.
              </span>
            </div>

            {pinError && (
              <p className="font-sans text-xs text-rose-300 font-semibold text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {pinError}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full bg-teal-500 hover:bg-teal-400 text-black font-sans text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-xl shadow-lg shadow-teal-500/15 cursor-pointer transition-colors"
            >
              Authorize Secure Entry
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Dashboard Panel */
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          {/* Quick Analytic Numbers Cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-[#0d1522] p-5 rounded-xl border border-white/10 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-500 font-sans text-[10px] font-bold uppercase tracking-widest">Unresolved / Pending</span>
                <span className="font-serif text-[#D4AF37] text-2xl mt-1 font-light">{pendingCount} Slots</span>
              </div>
              <div className="w-10 h-10 bg-white/[0.02] text-teal-400 border border-white/5 rounded-full flex items-center justify-center text-xs font-bold font-sans">
                Apt
              </div>
            </div>

            <div className="bg-[#0d1522] p-5 rounded-xl border border-white/10 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-500 font-sans text-[10px] font-bold uppercase tracking-widest">Confirmed Bookings</span>
                <span className="font-serif text-teal-450 text-teal-400 text-2xl mt-1 font-light">{confirmedCount} Slots</span>
              </div>
              <div className="w-10 h-10 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
              </div>
            </div>

            <div className="bg-[#0d1522] p-5 rounded-xl border border-white/10 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-500 font-sans text-[10px] font-bold uppercase tracking-widest">Actions Center</span>
                <span className="font-sans text-xs text-gray-450 mt-1 leading-normal">Populate sample clinic records.</span>
              </div>
              <div className="flex gap-1.5 shrink-0 font-sans">
                <button
                  onClick={handleSeedDemorecords}
                  className="p-2 bg-[#0a0f18] hover:bg-white/5 text-[#D4AF37] border border-white/5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  title="Seed Demonstration Records"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClearAllRecords}
                  className="p-2 bg-[#0a0f18] hover:bg-white/5 text-rose-450 rounded-lg text-xs font-bold transition-all border border-white/5 cursor-pointer text-rose-400"
                  title="Clear All Submissions"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Search bar controls & tabs wrapper */}
          <div className="bg-[#0d1522] rounded-xl border border-white/10 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* View tabs Toggle */}
            <div className="flex gap-1 bg-[#0a0f18]/80 p-1 border border-white/5 rounded-xl w-fit">
              <button
                onClick={() => {
                  setDashboardTab('Appointments');
                  setStatusFilter('All');
                }}
                className={`font-sans text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                  dashboardTab === 'Appointments' 
                    ? 'bg-[#0d1522]/90 text-[#D4AF37] shadow-lg border border-white/5' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Submitted Bookings ({appointments.length})</span>
              </button>
              
              <button
                onClick={() => {
                  setDashboardTab('Inquiries');
                  setStatusFilter('All');
                }}
                className={`font-sans text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                  dashboardTab === 'Inquiries' 
                    ? 'bg-[#0d1522]/90 text-[#D4AF37] shadow-lg border border-white/5' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Messages ({messages.length})</span>
              </button>
            </div>

            {/* Live Search context filter */}
            <div className="flex flex-col sm:flex-row items-center gap-2 flex-grow max-w-lg md:justify-end">
              
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search space..."
                  className="w-full font-sans text-xs py-2 px-3 pl-9 bg-[#0a0f18] border border-white/10 text-white rounded-xl outline-none focus:bg-[#0a0f18] focus:border-teal-500 transition-all font-medium"
                />
              </div>

              {/* Status secondary choice filter - active only on appointments tab */}
              {dashboardTab === 'Appointments' && (
                <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="font-sans text-xs py-1.5 px-2 bg-[#0a0f18] border border-white/10 text-white rounded-xl outline-none cursor-pointer focus:bg-[#0a0f18]"
                  >
                    <option value="All" className="bg-[#0a0f18]">All Statuses</option>
                    <option value="Pending" className="bg-[#0a0f18]">Pending</option>
                    <option value="Confirmed" className="bg-[#0a0f18]">Confirmed</option>
                    <option value="Completed" className="bg-[#0a0f18]">Completed</option>
                    <option value="Cancelled" className="bg-[#0a0f18]">Cancelled</option>
                  </select>
                </div>
              )}

              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                  loadLocalStoreData();
                }}
                className="p-2 bg-[#0a0f18] hover:bg-white/5 text-gray-400 border border-white/5 rounded-xl transition-all cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold"
                title="Refresh logs state"
              >
                <RefreshCw className="w-3.5 h-3.5 text-teal-400" /> Refresh
              </button>

            </div>

          </div>

          {/* Main listings canvas display */}
          <div className="bg-[#0d1522] rounded-2xl border border-white/10 shadow-2xl overflow-hidden min-h-[300px]">
            
            {dashboardTab === 'Appointments' ? (
              /* A. APPOINTMENTS RECORD LOG */
              filteredAppointments.length === 0 ? (
                <div className="p-16 text-center flex flex-col items-center gap-3">
                  <Calendar className="w-10 h-10 text-gray-650 text-gray-600" />
                  <p className="font-serif text-[#D4AF37] font-light text-sm">No Appointments Logged</p>
                  <p className="font-sans text-gray-450 text-xs max-w-xs mx-auto text-pretty leading-relaxed text-gray-450">
                    Once visitors book via the booking form, submissions display in real-time here. Alternatively, press the 'Seed' icon above to test layout instantly.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0a0f18] border-b border-white/10 text-gray-400 font-sans uppercase font-bold tracking-widest text-[10px]">
                        <th className="py-3 px-5">ID & Date</th>
                        <th className="py-3 px-5">Patient Particulars</th>
                        <th className="py-3 px-5">Requested Treatment</th>
                        <th className="py-3 px-5">Message Notes</th>
                        <th className="py-3 px-5">Status Badge</th>
                        <th className="py-3 px-5 text-right">Administrative Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 px-5">
                            <span className="font-mono font-bold text-gray-400 block">{apt.id}</span>
                            <span className="text-[10px] text-gray-500 mt-0.5 block whitespace-nowrap">{apt.createdAt}</span>
                          </td>
                          <td className="py-4 px-5">
                            <span className="font-bold text-white block">{apt.fullName}</span>
                            <span className="text-[10px] text-gray-450 mt-0.5 block">{apt.phoneNumber}</span>
                            <span className="text-[10px] text-gray-500 block break-all">{apt.email}</span>
                          </td>
                          <td className="py-4 px-5">
                            <span className="font-serif text-[#D4AF37] block whitespace-nowrap font-light">{apt.treatmentRequired}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5 whitespace-nowrap">
                              Date: <strong>{apt.preferredDate}</strong>
                            </span>
                            <span className="text-[10px] text-gray-500 block whitespace-nowrap">
                              Slot: {apt.preferredTime}
                            </span>
                          </td>
                          <td className="py-4 px-5 max-w-xs">
                            <p className="font-sans text-gray-400 leading-relaxed text-pretty text-xs line-clamp-3">
                              {apt.message || <em className="text-gray-650 text-gray-500">No medical message notes entered</em>}
                            </p>
                          </td>
                          <td className="py-4 px-5">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              apt.status === 'Pending' ? 'bg-[#0a0f18] text-yellow-450 border-yellow-500/25' :
                              apt.status === 'Confirmed' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' :
                              apt.status === 'Completed' ? 'bg-green-500/10 text-green-450 border-green-500/20' :
                              'bg-rose-500/10 text-rose-450 border-rose-500/20'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <div className="inline-flex gap-1 justify-end">
                              {apt.status === 'Pending' && (
                                <button
                                  onClick={() => handleUpdateAptStatus(apt.id, 'Confirmed')}
                                  className="py-1 px-2.5 bg-teal-500/10 hover:bg-teal-50 text-teal-400 hover:text-black font-sans text-[10px] font-bold rounded-lg transition-all border border-teal-550 border-teal-500/25 cursor-pointer uppercase tracking-wider"
                                  title="Confirm Patient"
                                >
                                  Approve
                                </button>
                              )}
                              {apt.status === 'Confirmed' && (
                                <button
                                  onClick={() => handleUpdateAptStatus(apt.id, 'Completed')}
                                  className="py-1 px-2.5 bg-green-500/10 hover:bg-green-500 text-green-450 hover:text-black font-sans text-[10px] font-bold rounded-lg transition-all border border-green-500/25 cursor-pointer uppercase tracking-wider"
                                  title="Mark Completed"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => handleUpdateAptStatus(apt.id, 'Cancelled')}
                                className="p-1 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Cancel appointment"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteApt(apt.id)}
                                className="p-1 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Delete entry permanently"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              /* B. INQUIRIES CONTACT LOG */
              filteredMessages.length === 0 ? (
                <div className="p-16 text-center flex flex-col items-center gap-3">
                  <MessageSquare className="w-10 h-10 text-gray-600" />
                  <p className="font-serif text-[#D4AF37] font-light text-sm">No Patient Messages Logged</p>
                  <p className="font-sans text-gray-400 text-xs max-w-xs mx-auto text-pretty">
                    Once prospective dental patients submit queries on our Contact Us page, messages display in real-time here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0a0f18] border-b border-white/10 text-gray-400 font-sans uppercase font-bold tracking-widest text-[10px]">
                        <th className="py-3 px-5">Timestamp</th>
                        <th className="py-3 px-5">Sender Details</th>
                        <th className="py-3 px-5">Comment / Question</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-white/[0.01]/50 transition-all">
                          <td className="py-4 px-5">
                            <span className="font-mono font-bold text-gray-400 block">{msg.id}</span>
                            <span className="text-[10px] text-gray-500 mt-0.5 block">{msg.createdAt}</span>
                          </td>
                          <td className="py-4 px-5">
                            <span className="font-bold text-white block">{msg.fullName}</span>
                            <span className="text-[10px] text-gray-450 mt-0.5 block">{msg.phoneNumber}</span>
                            <span className="text-[10px] text-gray-500 block break-all">{msg.email}</span>
                          </td>
                          <td className="py-4 px-5 max-w-md">
                            <p className="font-sans text-gray-300 leading-relaxed text-pretty text-xs bg-[#0a0f18]/60 p-2.5 rounded-lg border border-white/5">
                              "{msg.message}"
                            </p>
                          </td>
                          <td className="py-4 px-5">
                            <button
                              onClick={() => handleToggleMsgStatus(msg.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors border ${
                                msg.status === 'Unread' 
                                  ? 'bg-rose-550/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/25 bg-rose-500/10' 
                                  : 'bg-emerald-555/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25 bg-emerald-500/10'
                              }`}
                              title="Toggle Response log"
                            >
                              {msg.status === 'Unread' ? '● Unread' : '✓ Replied'}
                            </button>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              onClick={() => handleDeleteMsg(msg.id)}
                              className="p-1 text-gray-500 hover:text-rose-450 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete query"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

          </div>

          <div className="flex justify-between items-center bg-[#0a0f18] p-4 rounded-xl text-[10px] text-gray-500 border border-white/5 font-sans">
            <span>Mark Dental Clinic Management System Beta &amp; Dedicated Client Registry</span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-[#D4AF37] hover:text-white font-bold hover:underline cursor-pointer transition-colors"
            >
              Sign Out Securely
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, CalendarDays, ClipboardCheck, Megaphone, GraduationCap,
  Search, Bell, ChevronDown, Plus, ArrowUpRight, Clock3, CheckCircle2, XCircle,
  MoreHorizontal, Menu, Sparkles, BriefcaseBusiness, CalendarCheck, TrendingUp
} from 'lucide-react';

const people = [
  {name:'Aarav Sharma', role:'Product Designer', team:'Design', status:'Present', initials:'AS', color:'lavender'},
  {name:'Meera Kapoor', role:'Frontend Developer', team:'Engineering', status:'Present', initials:'MK', color:'mint'},
  {name:'Rohan Verma', role:'Engineering Manager', team:'Engineering', status:'On leave', initials:'RV', color:'peach'},
  {name:'Ananya Singh', role:'People Operations', team:'Human Resources', status:'Present', initials:'AS', color:'blue'},
  {name:'Kabir Patel', role:'Data Analyst', team:'Analytics', status:'Remote', initials:'KP', color:'pink'},
];
const requests = [
  {name:'Rohan Verma', initials:'RV', kind:'Annual leave', dates:'Oct 30 – Nov 01, 2026', days:'3 days', color:'peach'},
  {name:'Priya Nair', initials:'PN', kind:'Sick leave', dates:'Oct 29, 2026', days:'1 day', color:'lavender'},
  {name:'Kabir Patel', initials:'KP', kind:'Personal leave', dates:'Nov 04 – Nov 05, 2026', days:'2 days', color:'mint'},
];
const announcements = [
  {tag:'COMPANY NEWS', title:'Town hall: Q4 priorities & wins', date:'Today · 10:30 AM', color:'purple'},
  {tag:'PEOPLE & CULTURE', title:'Open enrollment starts next Monday', date:'Yesterday · 4:15 PM', color:'orange'},
];
const nav = [
  {label:'Workspace', items:[['Overview',LayoutDashboard],['Employees',Users],['Attendance',CalendarCheck],['Leave management',CalendarDays]]},
  {label:'WORK & GROWTH', items:[['Training',GraduationCap],['Announcements',Megaphone]]}
];
export default function App(){
  const [role,setRole] = useState('HR Admin');
  const [page,setPage] = useState('Overview');
  const [mobileOpen,setMobileOpen] = useState(false);
  const [search,setSearch] = useState('');
  const [toast,setToast] = useState('');
  const [leaveStatus,setLeaveStatus] = useState({});
  const [showAdd,setShowAdd] = useState(false);
  const [newName,setNewName] = useState('');
  const [extraPeople,setExtraPeople] = useState([]);
  const allPeople = [...people,...extraPeople];
  const visiblePeople = useMemo(()=>allPeople.filter(p=>(p.name+' '+p.role+' '+p.team).toLowerCase().includes(search.toLowerCase())),[search,extraPeople]);
  const notify = (s)=>{setToast(s); setTimeout(()=>setToast(''),2600)};
  const isEmployee = role === 'Employee';
  const title = page === 'Overview' ? (isEmployee ? 'My workspace' : 'Good morning, Ananya 👋') : page;
  const subtitle = page === 'Overview' ? (isEmployee ? 'Here’s your workday at a glance.' : 'Here’s what’s happening across your organization today.') : `Manage ${page.toLowerCase()} and keep your team in sync.`;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen?'open':''}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={20}/></div><div><b>staffsync</b><small>PEOPLE, IN SYNC</small></div><button className="mobile-close" onClick={()=>setMobileOpen(false)}>×</button></div>
      <div className="workspace-switch"><div className="workspace-icon">N</div><div className="workspace-copy"><b>Northstar Studio</b><span>Workspace</span></div><ChevronDown size={16}/></div>
      <div className="nav-area">
        {nav.map(group=><div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.filter(([label])=>!isEmployee || ['Overview','Attendance','Leave management','Training','Announcements'].includes(label)).map(([label,Icon])=><button key={label} onClick={()=>{setPage(label);setMobileOpen(false)}} className={`nav-link ${page===label?'active':''}`}><Icon size={18}/><span>{label}</span>{label==='Leave management'&&<span className="nav-count">3</span>}</button>)}</div>)}
      </div>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><b>Need a hand?</b><p>Visit the help center for tips and guides.</p><button onClick={()=>notify('Help center demo opened')}>Open help center <ArrowUpRight size={14}/></button></div><div className="profile-row"><div className="avatar blue">AN</div><div className="profile-copy"><b>{isEmployee?'Aarav Sharma':'Ananya Singh'}</b><span>{role}</span></div><MoreHorizontal size={19}/></div></div>
    </aside>
    {mobileOpen&&<div className="scrim" onClick={()=>setMobileOpen(false)} />}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="crumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><div className="searchbox"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anything..." /></div><button className="icon-button notification" onClick={()=>notify('You’re all caught up!')}><Bell size={19}/><i/></button><div className="top-avatar">AN</div></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow"><span className="live-dot"></span> THURSDAY, OCTOBER 29, 2026</div><h1>{title}</h1><p>{subtitle}</p></div><div className="heading-actions"><label className="role-select">View as <select value={role} onChange={e=>{setRole(e.target.value);notify(`Switched to ${e.target.value} preview`)}}><option>HR Admin</option><option>Manager</option><option>Employee</option></select><ChevronDown size={14}/></label><button className="primary-btn" onClick={()=>{setShowAdd(true);setPage('Employees')}}><Plus size={17}/> Add employee</button></div></div>
        {page==='Overview' ? <Overview isEmployee={isEmployee} role={role} leaveStatus={leaveStatus} setLeaveStatus={setLeaveStatus} notify={notify} setPage={setPage} /> :
          page==='Employees' ? <section className="panel full-panel"><div className="panel-heading"><div><h2>Employee directory</h2><p>Everyone on your team, all in one place.</p></div><button className="soft-btn" onClick={()=>setShowAdd(v=>!v)}><Plus size={16}/> Add employee</button></div>{showAdd&&<form className="add-form" onSubmit={e=>{e.preventDefault();if(newName.trim()){setExtraPeople(prev=>[...prev,{name:newName.trim(),role:'New team member',team:'Unassigned',status:'Present',initials:newName.trim().split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),color:'mint'}]);setNewName('');setShowAdd(false);notify('Employee added to demo directory')}}}><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Employee full name" required/><button className="primary-btn">Save employee</button></form>}<PeopleTable people={visiblePeople}/></section> :
          page==='Leave management' ? <section className="panel full-panel"><div className="panel-heading"><div><h2>Leave requests</h2><p>Review and manage time-off requests.</p></div><span className="pill pending">3 pending</span></div><LeaveTable requests={requests} leaveStatus={leaveStatus} setLeaveStatus={setLeaveStatus} notify={notify}/></section> :
          page==='Attendance' ? <section className="panel full-panel"><div className="panel-heading"><div><h2>Attendance overview</h2><p>Team attendance for today.</p></div><button className="soft-btn" onClick={()=>notify('Attendance report exported (demo)')}>Export report</button></div><PeopleTable people={allPeople}/></section> :
          page==='Announcements' ? <section className="panel full-panel"><div className="panel-heading"><div><h2>Company announcements</h2><p>Important updates for your organization.</p></div><button className="soft-btn" onClick={()=>notify('Announcement composer opened (demo)')}><Plus size={16}/> New announcement</button></div><AnnouncementList/></section> :
          <section className="panel full-panel"><div className="panel-heading"><div><h2>{page} & development</h2><p>Help your people keep learning and growing.</p></div><button className="soft-btn" onClick={()=>notify(`${page} action opened (demo)`)}><Plus size={16}/> Create new</button></div><div className="empty-feature"><div className="feature-orb"><GraduationCap size={28}/></div><h3>Growth starts with a plan.</h3><p>Organize learning paths, track progress, and support your team's next step.</p><button className="primary-btn" onClick={()=>notify('Feature preview opened')}>Explore {page.toLowerCase()} <ArrowUpRight size={16}/></button></div></section>
        }
        <footer><span>© 2026 StaffSync, Inc.</span><span><span className="footer-dot"></span> All systems operational</span><span>Made for better workdays ✳</span></footer>
      </div>
    </main>
    {toast&&<div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>
}
function Overview({isEmployee,role,leaveStatus,setLeaveStatus,notify,setPage}){
 return <>
  <div className="welcome-banner"><div className="banner-pattern"></div><div className="banner-copy"><div className="banner-tag"><Sparkles size={13}/> YOUR PEOPLE, AT A GLANCE</div><h2>{isEmployee?'Make today a great workday.':'Great teams start with people who feel supported.'}</h2><p>{isEmployee?'Everything you need to stay on top of your workday.':'A little overview of the people and moments that make your workplace thrive.'}</p><button onClick={()=>setPage(isEmployee?'Leave management':'Employees')}>{isEmployee?'Manage my time off':'Explore your team'} <ArrowUpRight size={15}/></button></div><div className="banner-art"><div className="art-ring ring-one"></div><div className="art-ring ring-two"></div><div className="art-core"><Users size={37}/></div><div className="floating-card fc-one"><span className="mini-check"><CheckCircle2 size={15}/></span><div><b>Team synced</b><small>Looking good today</small></div></div><div className="floating-card fc-two"><div className="mini-avatars"><i>AS</i><i>MK</i><i>+8</i></div><div><b>12 team members</b><small>working today</small></div></div></div></div>
  <div className="stats-grid">
   <Stat icon={Users} label={isEmployee?'My team':'Total employees'} value={isEmployee?'12':'248'} change={isEmployee?'3 departments':'+12 this month'} color="purple" />
   <Stat icon={CalendarCheck} label={isEmployee?'Attendance':'Present today'} value={isEmployee?'9:02 AM':'216'} change={isEmployee?'Checked in today':'87.1% attendance rate'} color="green" />
   <Stat icon={CalendarDays} label="Leave requests" value={isEmployee?'12 days':'18'} change={isEmployee?'Annual leave balance':'3 need your attention'} color="orange" />
   <Stat icon={TrendingUp} label="Team engagement" value="92%" change="+4.8% vs last month" color="blue" />
  </div>
  <div className="dashboard-grid">
   <section className="panel team-panel"><div className="panel-heading"><div><h2>{isEmployee?'My colleagues':'People overview'}</h2><p>A quick look at your people.</p></div><button className="text-btn" onClick={()=>setPage('Employees')}>View all <ArrowUpRight size={14}/></button></div><PeopleTable people={people.slice(0,4)} compact/></section>
   <section className="panel leave-panel"><div className="panel-heading"><div><h2>{isEmployee?'My time off':'Leave requests'}</h2><p>{isEmployee?'Your upcoming requests':'Needs a quick review'}</p></div><button className="round-link" onClick={()=>setPage('Leave management')}><ArrowUpRight size={16}/></button></div><div className="leave-list">{requests.slice(0,3).map((r,i)=><div className="leave-item" key={r.name}><div className={`avatar ${r.color}`}>{r.initials}</div><div className="leave-person"><b>{isEmployee&&i===0?'You':r.name}</b><span>{r.kind} · {r.dates}</span></div><div className="leave-side">{leaveStatus[r.name]?<span className={`pill ${leaveStatus[r.name]}`}>{leaveStatus[r.name]}</span>:<span className="pill pending">Pending</span>}</div></div>)}</div><button className="bottom-link" onClick={()=>setPage('Leave management')}>Review all requests <ArrowUpRight size={15}/></button></section>
   <section className="panel attendance-panel"><div className="panel-heading"><div><h2>Attendance snapshot</h2><p>Today's team check-in status</p></div><span className="pill present">Live today</span></div><div className="attendance-number"><b>87.1%</b><span>attendance rate</span><div className="trend"><TrendingUp size={14}/> 2.4%</div></div><div className="progress-track"><div className="progress-fill" style={{width:'87.1%'}}></div></div><div className="attendance-legend"><span><i className="legend-green"></i>Present <b>216</b></span><span><i className="legend-orange"></i>On leave <b>18</b></span><span><i className="legend-gray"></i>Absent <b>14</b></span></div></section>
   <section className="panel announcements-panel"><div className="panel-heading"><div><h2>Latest updates</h2><p>News from your workplace</p></div><button className="text-btn" onClick={()=>setPage('Announcements')}>All updates <ArrowUpRight size={14}/></button></div><AnnouncementList compact/></section>
  </div>
 </>
}
function Stat({icon:Icon,label,value,change,color}){return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={19}/></div><span className="stat-label">{label}</span><strong>{value}</strong><div className="stat-change"><span className="change-dot"></span>{change}</div><div className="stat-spark"><TrendingUp size={15}/></div></div>}
function PeopleTable({people,compact=false}){return <div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>STATUS</th>{!compact&&<th></th>}</tr></thead><tbody>{people.map((p,i)=><tr key={p.name}><td><div className="person-cell"><div className={`avatar ${p.color}`}>{p.initials}</div><div><b>{p.name}</b><span>{p.role}</span></div></div></td><td><span className="department">{p.team}</span></td><td><span className={`status ${p.status==='Present'?'status-present':p.status==='Remote'?'status-remote':'status-leave'}`}><i></i>{p.status}</span></td>{!compact&&<td><button className="dots-btn" aria-label={`Actions for ${p.name}`}><MoreHorizontal size={18}/></button></td>}</tr>)}</tbody></table>{people.length===0&&<div className="no-results">No employees match your search.</div>}</div>}
function LeaveTable({requests,leaveStatus,setLeaveStatus,notify}){return <div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>LEAVE TYPE</th><th>DATES</th><th>DURATION</th><th>STATUS / ACTIONS</th></tr></thead><tbody>{requests.map(r=><tr key={r.name}><td><div className="person-cell"><div className={`avatar ${r.color}`}>{r.initials}</div><div><b>{r.name}</b><span>Team member</span></div></div></td><td>{r.kind}</td><td>{r.dates}</td><td>{r.days}</td><td>{leaveStatus[r.name]?<span className={`pill ${leaveStatus[r.name]}`}>{leaveStatus[r.name]}</span>:<div className="row-actions"><button className="approve-btn" onClick={()=>{setLeaveStatus(s=>({...s,[r.name]:'Approved'}));notify(`${r.name}'s leave approved (demo)`)}} aria-label="Approve"><CheckCircle2 size={16}/></button><button className="reject-btn" onClick={()=>{setLeaveStatus(s=>({...s,[r.name]:'Rejected'}));notify(`${r.name}'s leave rejected (demo)`)}} aria-label="Reject"><XCircle size={16}/></button></div>}</td></tr>)}</tbody></table></div>}
function AnnouncementList({compact=false}){return <div className={`announcement-list ${compact?'compact':''}`}>{announcements.map((a,i)=><div className="announcement" key={a.title}><div className={`announcement-icon ${a.color}`}>{i===0?<Megaphone size={18}/>:<BriefcaseBusiness size={18}/>}</div><div className="announcement-copy"><span className={`announcement-tag ${a.color}`}>{a.tag}</span><b>{a.title}</b><small>{a.date}</small></div><ArrowUpRight size={16} className="announcement-arrow"/></div>)}</div>}
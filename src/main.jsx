import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, Search, ShoppingBag, Home, Images, ChefHat, MoreHorizontal, Plus, Sun, Moon, Phone, MessageCircle } from 'lucide-react';
import './styles.css';

const media = {
  logo: 'https://drive.google.com/thumbnail?id=1bw9TKNqoPQ2DOS-RefPqBzp2m9hPd1fR&sz=w500',
  rabby: 'https://drive.google.com/thumbnail?id=1VUIYjd9QmAZHTHMKciO8tm0ydgB9-F6S&sz=w1200',
  kuwait: 'https://drive.google.com/thumbnail?id=1_fEULVCL2D4-biR2yiurru7I_2UZ-3dF&sz=w1200',
  tea: 'https://drive.google.com/thumbnail?id=1auXA1Wkh4NqYyeLcZLA4lCLyzAA598RB&sz=w1200'
};

const initialMenu = [
  ['বার্গার',80,'বার্গার','🍔','মাস্টারশেফ Rabby-এর সিক্রেট সস, জুসি প্যাটি ও ফ্রেশ সবজি।',true],
  ['সাব স্যান্ডউইচ',90,'স্যান্ডউইচ','🥪','সফট সাব ব্রেড, চিকেন, সবজি ও ক্রিমি ড্রেসিং।',false],
  ['শর্মা',80,'শর্মা','🌯','মশলাদার চিকেন, গার্লিক মেয়ো ও নরম রুটি।',true],
  ['চাওমিন',50,'চাওমিন','🍜','হাই-ফ্লেমে টস করা ঝাল ঝাল নুডলস।',true],
  ['কোল্ড কফি',50,'কফি','🥤','চিলড মিল্ক, কফি ও ক্রিমের রিফ্রেশিং ব্লেন্ড।',true],
  ['হট কফি',50,'কফি','☕','ফ্রেশলি ব্রিউড উষ্ণ কফি।',false],
  ['মালাই চা',15,'চা',media.tea,'ঘন দুধের সর ও মালাই সমৃদ্ধ বিখ্যাত চা।',true],
  ['মালাই রুটি',60,'স্ন্যাকস','🫓','গরম রুটি, ঘন মালাই ও হালকা মিষ্টি স্বাদ।',false],
  ['স্পেশাল চিজ বার্গার',110,'বার্গার','🧀','ডাবল চিজ, স্পেশাল প্যাটি ও রাজকীয় সস।',true]
].map((x,i)=>({id:i+1,name:x[0],price:x[1],category:x[2],visual:x[3],description:x[4],special:x[5],inStock:true}));

function App(){
  const [page,setPage]=useState('home');
  const [dark,setDark]=useState(true);
  const [drawer,setDrawer]=useState(false);
  const [quick,setQuick]=useState(false);
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('সব');
  const [cart,setCart]=useState({});
  const [menu,setMenu]=useState(initialMenu);
  const [admin,setAdmin]=useState(false);
  const categories=['সব',...new Set(menu.map(x=>x.category))];
  const filtered=useMemo(()=>menu.filter(x=>(category==='সব'||x.category===category)&&x.name.includes(query)),[menu,category,query]);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const add=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));

  const nav=(id)=>{setPage(id);setDrawer(false);setQuick(false);scrollTo({top:0,behavior:'smooth'})};
  return <div className={dark?'app':'app light'}>
    <div className="top-strip"><span>🏅 মাস্টারশেফ Rabby</span><div><button onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button><button>বাংলা</button></div></div>
    <header>
      <button className="icon" onClick={()=>setDrawer(true)}><Menu/></button>
      <div className="brand"><img src={media.logo}/><div><b>কফি পয়েন্ট</b><small>Masterchef Rabby</small></div></div>
      <button className="bag"><ShoppingBag/><span>{count||''}</span></button>
    </header>

    {page==='home'&&<Home nav={nav} add={add} menu={menu}/>} 
    {page==='menu'&&<MenuPage menu={filtered} query={query} setQuery={setQuery} categories={categories} category={category} setCategory={setCategory} add={add}/>} 
    {page==='chef'&&<ChefPage/>}
    {page==='gallery'&&<Gallery/>}
    {page==='print'&&<Printable menu={menu}/>} 
    {page==='admin'&&<Admin menu={menu} setMenu={setMenu} unlocked={admin} setUnlocked={setAdmin}/>} 
    {!['home','menu','chef','gallery','print','admin'].includes(page)&&<ModulePage page={page}/>} 

    <footer>সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ<br/><a href="https://seeam.vercel.app">Developed by Seeam</a></footer>

    <nav className="bottom-nav">
      <button onClick={()=>nav('home')}><Home/><span>হোম</span></button>
      <button onClick={()=>nav('menu')}><ChefHat/><span>মেন্যু</span></button>
      <button className="plus" onClick={()=>setQuick(true)}><Plus/></button>
      <button onClick={()=>nav('gallery')}><Images/><span>গ্যালারি</span></button>
      <button onClick={()=>setDrawer(true)}><MoreHorizontal/><span>আরও</span></button>
    </nav>

    {drawer&&<div className="overlay" onClick={()=>setDrawer(false)}><aside onClick={e=>e.stopPropagation()}><div className="side-brand"><img src={media.logo}/><b>Coffee Point</b></div>{[['home','হোম'],['menu','ডিজিটাল মেন্যু'],['chef','Masterchef Rabby'],['gallery','গ্যালারি'],['videos','ভিডিও'],['ar','AR ৩ডি'],['camera','ক্যামেরা'],['reviews','রিভিউ'],['combo','কম্বো'],['service','টেবিল সার্ভিস'],['qr','QR জেনারেটর'],['print','প্রিন্টেবল মেন্যু'],['admin','সুপার অ্যাডমিন']].map(x=><button onClick={()=>nav(x[0])}>{x[1]}</button>)}<a href="https://wa.me/8801319885649"><MessageCircle/> WhatsApp</a><a href="tel:+8801319885649"><Phone/> কল করুন</a></aside></div>}
    {quick&&<div className="overlay" onClick={()=>setQuick(false)}><section className="quick" onClick={e=>e.stopPropagation()}><h2>দ্রুত সুবিধা</h2><div>{[['service','🔔','ওয়েটার'],['qr','▦','QR'],['camera','📷','ক্যামেরা'],['combo','📦','কম্বো'],['print','🖨','প্রিন্ট'],['admin','⚙','অ্যাডমিন']].map(x=><button onClick={()=>nav(x[0])}><b>{x[1]}</b>{x[2]}</button>)}</div></section></div>}
  </div>
}

const Home=({nav,add,menu})=><>
  <section className="hero"><div><span className="eyebrow">✦ রান্না একটি শিল্প</span><h1>স্বাদের সাথে <em>গল্পও পরিবেশন।</em></h1><p>কুয়েতের অভিজ্ঞতা এবং Keraniganj-এর আন্তরিকতা—Masterchef Rabby-এর হাতে প্রতিটি খাবার হয়ে ওঠে শিল্প।</p><div className="actions"><button onClick={()=>nav('menu')}>মেন্যু দেখুন</button><button className="ghost" onClick={()=>nav('chef')}>শেফের গল্প</button></div></div><div className="portrait"><img src={media.rabby}/><div><b>৮+ বছর</b><span>Kuwait experience</span></div></div></section>
  <section className="stats">{[['১৮+','মেন্যু আইটেম'],['৳১৫','থেকে শুরু'],['১ ট্যাপ','টেবিল সার্ভিস'],['১০০%','Freshly crafted']].map(x=><div><b>{x[0]}</b><span>{x[1]}</span></div>)}</section>
  <section className="section"><div className="title"><div><span className="eyebrow">জনপ্রিয়</span><h2>আজকের বিশেষ নির্বাচন</h2></div><button className="ghost" onClick={()=>nav('menu')}>সব দেখুন</button></div><div className="grid">{menu.filter(x=>x.special).slice(0,3).map(x=><Food item={x} add={add}/>)}</div></section>
  <section className="tea"><img src={media.tea}/><div><span className="eyebrow">সিগনেচার পরিবেশন</span><h2>মাটির কাপে ঘন মালাই চা</h2><p>শুধু চা নয়, Coffee Point-এর সবচেয়ে স্মরণীয় ছোট্ট অভিজ্ঞতা।</p><button onClick={()=>add(7)}>কার্টে যোগ করুন • ৳১৫</button></div></section>
</>;

const MenuPage=({menu,query,setQuery,categories,category,setCategory,add})=><main className="section"><div className="title"><div><span className="eyebrow">ডিজিটাল মেন্যু</span><h2>আপনার পছন্দ খুঁজুন</h2></div></div><div className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="খাবার খুঁজুন..."/></div><div className="chips">{categories.map(x=><button className={category===x?'active':''} onClick={()=>setCategory(x)}>{x}</button>)}</div><p className="muted">মোট {menu.length}টি আইটেম পাওয়া গেছে</p><div className="grid">{menu.map(x=><Food item={x} add={add}/>)}</div></main>;

const Food=({item,add})=><article className="food"><div className="food-media">{String(item.visual).startsWith('http')?<img src={item.visual}/>:<span>{item.visual}</span>}{item.special&&<b>মাস্টারশেফ স্পেশাল</b>}<strong>৳{item.price}</strong></div><div className="food-body"><h3>{item.name}</h3><p>{item.description}</p><button disabled={!item.inStock} onClick={()=>add(item.id)}>{item.inStock?'＋ অর্ডারে যোগ করুন':'স্টক শেষ'}</button></div></article>;

const ChefPage=()=> <main className="section"><div className="chef-layout"><img src={media.kuwait}/><div><span className="eyebrow">Kuwait → Keraniganj</span><h2>Masterchef Rabby</h2><p>Rabby কুয়েতের পেশাদার রান্নাঘরে ৮ বছরের বেশি সময় কাজ করে flavour balance, fast service, hygienic preparation এবং premium presentation আয়ত্ত করেছেন।</p><blockquote>“রান্না আমার আবেগ, আর প্রতিটি প্লেট আমার ক্যানভাস।”</blockquote><div className="actions"><a href="https://wa.me/8801319885649">WhatsApp</a><a className="ghost" href="https://www.facebook.com/share/1YJZBxzNKt/">Facebook</a></div></div></div></main>;

const Gallery=()=> <main className="section"><div className="title"><div><span className="eyebrow">মিডিয়া</span><h2>Chef ও Food Gallery</h2></div></div><div className="gallery">{[media.rabby,media.kuwait,media.tea].map(x=><img src={x}/>)}</div></main>;

const Printable=({menu})=><main className="section"><button onClick={()=>print()}>Print / Save PDF</button><div className="print-menu"><img src={media.logo}/><h1>COFFEE POINT</h1><p>Masterchef Rabby • Cooking is an Art</p>{menu.map(x=><div><span>{x.name}</span><i/><b>৳{x.price}</b></div>)}<p>সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ</p></div></main>;

function Admin({menu,setMenu,unlocked,setUnlocked}){const[pin,setPin]=useState('');if(!unlocked)return <main className="section"><div className="lock"><h2>🔐 Super Admin</h2><input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="Admin PIN"/><button onClick={()=>pin==='1234'&&setUnlocked(true)}>প্রবেশ করুন</button><small>Demo PIN: 1234</small></div></main>;return <main className="section"><div className="title"><div><span className="eyebrow">Business OS</span><h2>Super Admin Panel</h2></div></div><div className="metrics">{[['আজকের বিক্রি','৳১২,৪৫০'],['অর্ডার','১৪৮'],['গড় অর্ডার','৳৮৪'],['লো স্টক','৩']].map(x=><div><span>{x[0]}</span><b>{x[1]}</b></div>)}</div><div className="admin-table">{menu.map(x=><div><span>{x.name}</span><input type="number" value={x.price} onChange={e=>setMenu(m=>m.map(i=>i.id===x.id?{...i,price:+e.target.value}:i))}/><button onClick={()=>setMenu(m=>m.map(i=>i.id===x.id?{...i,inStock:!i.inStock}:i))}>{x.inStock?'In Stock':'Stock Out'}</button></div>)}</div></main>}

const ModulePage=({page})=><main className="section"><div className="module"><h2>{page.toUpperCase()}</h2><p>এই module production architecture-এর অংশ। Backend integration যুক্ত হলে live business data sync হবে।</p></div></main>;

createRoot(document.getElementById('root')).render(<App/>);

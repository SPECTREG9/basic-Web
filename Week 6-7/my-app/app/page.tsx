function HomePage() {
  return (
  <div><div className="text-center mt-3 p-3">
    <h1 className="text-4xl bg-blue-300">Welcome to My App</h1>
    <p className="text-2xl p-3 bg-blue-200">ไม่ยินดีต้อนรับ</p>
    </div>
    <div className="text-center text-2xl mt-6 text-amber-300">
      <a href="/light">บทเรียนที่1 State การเปิด/ปิดหลอกไฟ</a>
      <br />
      <a href="/count">บทเรียนที่2 State การเพิ่มลดตัวเลข</a>
       <br />
      <a href="/form">บทเรียนที่3 State ...</a>
     <br />
      <a href="/showhide">บทเรียนที4 State showhide</a>
    </div>
  </div>
  );
}

export default HomePage
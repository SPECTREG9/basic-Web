"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const INITIAL_TIME = 300;

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isExpired, setIsExpired] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (isExpired || isPaid) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isExpired, isPaid]);

  const formatTime = (time: number) => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const confirmPayment = () => {
    if (!isExpired) setIsPaid(true);
  };

  const isDanger = timeLeft <= 60 && !isExpired;

  return (
    <div className="wrapper">
      <div className="payment-card">
        {/* Header Section */}
        <div className="header">
          <button className="back-btn" onClick={() => router.back()}>
            <span className="icon">←</span> ย้อนกลับ
          </button>
          <div className="brand">Secure Payment</div>
        </div>

        {/* Status / Timer Section */}
        <div className="status-section">
          <p className="status-label">
            {isPaid ? "ได้รับยอดชำระแล้ว" : isExpired ? "หมดอายุแล้ว" : "กำลังรอการชำระเงิน..."}
          </p>
          
          {isExpired ? (
            <div className="status-badge expired">การชำระเงินหมดเวลา</div>
          ) : isPaid ? (
            <div className="status-badge success">ชำระเงินสำเร็จ</div>
          ) : (
            <div className={`timer-display ${isDanger ? "danger" : ""}`}>
              {formatTime(timeLeft)}
            </div>
          )}
          {!isExpired && !isPaid && (
            <p className="timer-subtext">กรุณาชำระเงินภายในเวลาที่กำหนด</p>
          )}
        </div>

        <hr className="divider" />

        {/* Main Content */}
        <div className="main-content">
          <div className="qr-section">
            <div className="qr-container">
              <div className="qr-frame">
                <Image
                  src="https://preview.redd.it/this-qr-is-probably-going-to-come-in-handy-for-those-that-v0-e1knw8ipu7sb1.png?auto=webp&s=6e5479ddb17572df9fbfe6ed7fa37dc801c16c06"
                  alt="Payment QR Code"
                  fill
                  priority
                />
              </div>
            </div>
            <p className="qr-hint">สแกนด้วยแอปธนาคารของคุณ</p>
          </div>

          <div className="payment-details">
            <div className="info-grid">
              <div className="info-item">
                <label>ชื่อลูกค้า</label>
                <span>John Doe</span>
              </div>
              <div className="info-item">
                <label>แพ็กเกจ</label>
                <span>Premium Pack</span>
              </div>
              <div className="info-item">
                <label>ยอดชำระสุทธิ</label>
                <span className="amount">฿5,000.00</span>
              </div>
            </div>

            <button
              className={`action-btn ${isPaid ? "paid" : ""}`}
              onClick={confirmPayment}
              disabled={isExpired || isPaid}
            >
              {isPaid ? "ตรวจสอบสำเร็จ" : isExpired ? "หมดเวลาแล้ว" : "ฉันชำระเงินแล้ว"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          background: radial-gradient(circle at center, #1e2129, #08090d);
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;      /* กึ่งกลางแนวตั้ง */
          justify-content: center;   /* กึ่งกลางแนวนอน */
          padding: 20px;
          box-sizing: border-box;
        }

        .payment-card {
          background: rgba(28, 31, 38, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 40px;
          border-radius: 28px;
          width: 100%;
          max-width: 680px;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .back-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 12px;
          color: #aaa;
          cursor: pointer;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .back-btn:hover { 
          color: #fff; 
          background: rgba(255,255,255,0.1);
        }

        .brand {
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.7rem;
          color: #00e676;
          opacity: 0.8;
        }

        /* Status Section */
        .status-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .status-label {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 8px;
        }

        .timer-display {
          font-size: 4rem;
          font-weight: 800;
          font-family: 'Monaco', 'Courier New', monospace;
          color: #fff;
          letter-spacing: -2px;
          margin: 8px 0;
        }

        .timer-display.danger {
          color: #ff5252;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .timer-subtext {
          font-size: 0.85rem;
          color: #555;
        }

        .status-badge {
          display: inline-block;
          padding: 12px 32px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1.1rem;
          margin: 10px 0;
        }

        .status-badge.success { background: rgba(0, 230, 118, 0.15); color: #00e676; border: 1px solid rgba(0, 230, 118, 0.2); }
        .status-badge.expired { background: rgba(255, 82, 82, 0.15); color: #ff5252; border: 1px solid rgba(255, 82, 82, 0.2); }

        .divider {
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin: 32px 0;
        }

        /* Main Content */
        .main-content {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .qr-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .qr-container {
          background: #fff;
          padding: 16px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .qr-frame {
          width: 200px;
          height: 200px;
          position: relative;
        }

        .qr-hint {
          font-size: 0.75rem;
          color: #666;
        }

        .payment-details {
          flex: 1;
        }

        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .info-item label {
          display: block;
          font-size: 0.75rem;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }

        .info-item span {
          font-size: 1.1rem;
          font-weight: 500;
          color: #eee;
        }

        .amount {
          font-size: 1.8rem !important;
          color: #00e676 !important;
          font-weight: 800 !important;
        }

        .action-btn {
          width: 100%;
          padding: 18px;
          border-radius: 16px;
          border: none;
          background: #00e676;
          color: #000;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .action-btn:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 230, 118, 0.3);
          filter: brightness(1.1);
        }

        .action-btn:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .action-btn:disabled {
          background: #2a2d35;
          color: #555;
          cursor: not-allowed;
        }

        .action-btn.paid {
          background: transparent;
          border: 2px solid #00e676;
          color: #00e676;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .main-content { 
            flex-direction: column; 
            text-align: center;
            gap: 30px;
          }
          .payment-card { padding: 30px 20px; }
          .timer-display { font-size: 3.2rem; }
          .qr-frame { width: 180px; height: 180px; }
          .info-grid { align-items: center; }
        }
      `}</style>
    </div>
  );
}
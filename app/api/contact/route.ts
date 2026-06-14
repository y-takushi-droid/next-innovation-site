import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { company, name, email, subject, detail, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"Next Innovation お問い合わせ" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `【お問い合わせ】${subject}`,
      text: [
        `会社名・屋号: ${company || '（個人）'}`,
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `お問い合わせ種別: ${subject}`,
        `詳細: ${detail || '（指定なし）'}`,
        ``,
        `メッセージ:`,
        message,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 });
  }
}

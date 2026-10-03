"use client";
import { useState } from "react";

function Question({ q, v1, v2, v3, v4, answers, hovered, select, hover }) {
    return (
        <div className="q-card">
            <h2>Q{q}. Which video shows the greatest mismatch between lip movements and audio?</h2>

            <div className="video-grid">
                <div className={`video-box ${answers[q] === 1 || hovered[q] === 1 ? "active" : ""}`}>
                    <video controls src={v1} />
                </div>
                <div className={`video-box ${answers[q] === 2 || hovered[q] === 2 ? "active" : ""}`}>
                    <video controls src={v2} />
                </div>
                <div className={`video-box ${answers[q] === 3 || hovered[q] === 3 ? "active" : ""}`}>
                    <video controls src={v3} />
                </div>
                <div className={`video-box ${answers[q] === 4 || hovered[q] === 4 ? "active" : ""}`}>
                    <video controls src={v4} />
                </div>
            </div>

            <div className="btn-row">
                <button onMouseEnter={() => hover(q, 1)} onMouseLeave={() => hover(q, null)} onClick={() => select(q, 1)} className={answers[q] === 1 ? "selected" : ""}>1</button>
                <button onMouseEnter={() => hover(q, 2)} onMouseLeave={() => hover(q, null)} onClick={() => select(q, 2)} className={answers[q] === 2 ? "selected" : ""}>2</button>
                <button onMouseEnter={() => hover(q, 3)} onMouseLeave={() => hover(q, null)} onClick={() => select(q, 3)} className={answers[q] === 3 ? "selected" : ""}>3</button>
                <button onMouseEnter={() => hover(q, 4)} onMouseLeave={() => hover(q, null)} onClick={() => select(q, 4)} className={answers[q] === 4 ? "selected" : ""}>4</button>
            </div>
        </div>
    );
}

export default function Home() {
    const [answers, setAnswers] = useState({});
    const [hovered, setHovered] = useState({});
    const [done, setDone] = useState(false);
    const [name, setName] = useState("");
    const [affiliation, setAffiliation] = useState("");

    const select = (q, val) => {
        setAnswers((prev) => ({ ...prev, [q]: val }));
    };

    const hover = (q, val) => {
        setHovered((prev) => ({ ...prev, [q]: val }));
    };

    const submit = async () => {
        if (!name || !affiliation) {
            alert("Please enter your id");
            return;
        }

        if (Object.keys(answers).length !== 10) {
            alert("Please answer all questions");
            return;
        }

        await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                affiliation,
                answers
            }),
        });

        setDone(true);
    };

    if (done) {
        return (
            <div className="done-page">
                <div className="done-container">

                    <div className="done-icon">🎉</div>

                    <h1>Your submission has been completed</h1>

                    <p>
                        Your responses have been successfully saved.<br/>
                        Thank you for participating in the survey.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <header className="header">
                    <h1>Talking-Head Video Lip-Sync Study</h1>
                    <p>
                        In this study, you will evaluate how well lip movements match speech in short talking-head video clips.
                        <br/>
                        <br/>
                        There are 10 questions. For each question, watch all four videos with the sound on and select the one video in which the lip movements match the speech least well. 
                        <br/>
                        Please base your choices on your own perception. No specialist knowledge is required.
                    </p>
                </header>

                <div className="notice">
                    Important guidelines:
                    <br/>- The study is expected to take 10–15 minutes. The reward for completing the study is US $2.00. Please participate in a quiet environment using a desktop or laptop computer and headphones or earphones.
                    <br/>- Please complete the study attentively and follow the instructions. Submissions showing clear, objective evidence of consistently low effort throughout the study may be rejected without payment, in accordance with Prolific’s policies.
                    <br/>- Payment does not depend on which videos you select. Honest differences in perception will not affect your payment.
                    <br/>- Participation is voluntary, and you may stop at any time. If you experience playback problems or have questions, please contact the researcher through Prolific messages 
                    <br/>
                    <br/>
                    The study takes approximately 10 minutes to complete.
                </div>

                <div className="info-box">
                    <div className="input-group">
                        <label>Prolific ID</label>
                        <input
                            type="text"
                            value={affiliation}
                            onChange={(e) => setAffiliation(e.target.value)}
                            placeholder="Prolific ID"
                        />
                    </div>
                </div>

                <Question q={1} v1="video/ARO/0024_adv_inference.mp4" v2="video/CAF/0024_adv_inference.mp4" v3="video/ours/0024_adv_inference.mp4" v4="video/SAGO/0024_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={2} v1="video/SAGO/0005_adv_inference.mp4" v2="video/CAF/0005_adv_inference.mp4" v3="video/ARO/0005_adv_inference.mp4" v4="video/ours/0005_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={3} v1="video/ours/0086_adv_inference.mp4" v2="video/SAGO/0086_adv_inference.mp4" v3="video/ARO/0086_adv_inference.mp4" v4="video/CAF/0086_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={4} v1="video/SAGO/0050_adv_inference.mp4" v2="video/CAF/0050_adv_inference.mp4" v3="video/ours/0050_adv_inference.mp4" v4="video/ARO/0050_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={5} v1="video/ARO/0026_adv_inference.mp4" v2="video/ours/0026_adv_inference.mp4" v3="video/SAGO/0026_adv_inference.mp4" v4="video/CAF/0026_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={6} v1="video/CAF/0021_adv_inference.mp4" v2="video/ARO/0021_adv_inference.mp4" v3="video/SAGO/0021_adv_inference.mp4" v4="video/ours/0021_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={7} v1="video/ours/0027_adv_inference.mp4" v2="video/CAF/0027_adv_inference.mp4" v3="video/ARO/0027_adv_inference.mp4" v4="video/SAGO/0027_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={8} v1="video/SAGO/0003_adv_inference.mp4" v2="video/ours/0003_adv_inference.mp4" v3="video/CAF/0003_adv_inference.mp4" v4="video/ARO/0003_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={9} v1="video/ARO/0064_adv_inference.mp4" v2="video/SAGO/0064_adv_inference.mp4" v3="video/CAF/0064_adv_inference.mp4" v4="video/ours/0064_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />
                <Question q={10} v1="video/CAF/0044_adv_inference.mp4" v2="video/SAGO/0044_adv_inference.mp4" v3="video/ours/0044_adv_inference.mp4" v4="video/ARO/0044_adv_inference.mp4" answers={answers} hovered={hovered} select={select} hover={hover} />

                <div className="submit-wrap">
                    <button onClick={submit} className="submit-btn">
                        submit
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .page {
                    min-height: 100vh;
                    background: #f3f6fb;
                    padding: 40px 16px;
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                }

                .header {
                    text-align: center;
                    margin-bottom: 32px;
                    color: #475569;
                    line-height: 1.8;
                }

                .eyebrow {
                    display: inline-block;
                    margin-bottom: 10px;
                    padding: 6px 14px;
                    border-radius: 999px;
                    background: #e8efff;
                    color: #4f73ff;
                    font-weight: 800;
                    font-size: 14px;
                }

                .header h1 {
                    margin: 0 0 12px;
                    color: #1e293b;
                    font-size: 32px;
                    font-weight: 900;
                }

                .notice {
                    margin-bottom: 24px;
                    padding: 18px 20px;
                    border-left: 4px solid #4f73ff;
                    border-radius: 12px;
                    background: #eef4ff;
                    color: #475569;
                    line-height: 1.8;
                }

                .q-card {
                    margin-bottom: 24px;
                    padding: 28px;
                    border: 1px solid #dbe3ef;
                    border-radius: 18px;
                    background: white;
                    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
                }

                .q-card h2 {
                    margin: 0 0 20px;
                    color: #1e293b;
                    font-size: 18px;
                    font-weight: 800;
                }

                .info-box {
                    margin-bottom: 24px;
                    padding: 20px;
                    background: white;
                    border: 1px solid #dbe3ef;
                    border-radius: 14px;
                    display: flex;
                    gap: 16px;
                }

                .input-group {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .input-group label {
                    font-size: 14px;
                    font-weight: 700;
                    color: #334155;
                }

                .input-group input {
                    padding: 10px 12px;
                    border-radius: 8px;
                    border: 1px solid #dbe3ef;
                    outline: none;
                }

                .input-group input:focus {
                    border-color: #4f73ff;
                }

                .video-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);  /* 기본 = 2열 */
                    gap: 12px;
                }

                @media (min-width: 1024px) {
                    .video-grid {
                        grid-template-columns: repeat(4, 1fr);  /* PC = 4열 */
                    }
                }

                .video-box {
                    padding: 4px;
                    border: 4px solid transparent;
                    border-radius: 14px;
                    background: white;

                    aspect-ratio: 1 / 1;   /* 핵심 */
                    overflow: hidden;
                }

                .video-box.active {
                    border-color: #4f73ff;
                    box-shadow: 0 0 0 4px rgba(79, 115, 255, 0.14);
                }

                .video-box video {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                }

                .btn-row {
                    display: flex;
                    gap: 12px;
                    margin-top: 10px; 
                }

                .btn-row button {
                    flex: 1;
                    padding: 12px 0;
                    border: 1px solid #d8e1ef;
                    border-radius: 10px;
                    background: white;
                    color: #475569;
                    font-weight: 800;
                    transition: all 0.15s ease;
                    cursor: pointer;
                }

                .btn-row button:hover {
                    background: #eef4ff;
                    border-color: #4f73ff;
                    color: #4f73ff;
                }

                .btn-row button.selected {
                    background: #4f73ff;
                    border-color: #4f73ff;
                    color: white;
                }

                .submit-wrap {
                    text-align: center;
                    margin-top: 36px;
                }

                .submit-btn {
                    padding: 14px 44px;
                    border: 0;
                    border-radius: 12px;
                    background: #4f73ff;
                    color: white;
                    font-weight: 800;
                    font-size: 16px;
                    box-shadow: 0 8px 20px rgba(79, 115, 255, 0.25);
                    cursor: pointer;
                }

                .done-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #eef4ff, #f8fbff);
                }

                .done-container {
                    width: 100%;
                    max-width: 500px;
                    background: white;
                    padding: 50px 40px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.08);
                }

                .done-icon {
                    font-size: 50px;
                    margin-bottom: 20px;
                }

                .done-container h1 {
                    font-size: 26px;
                    font-weight: 900;
                    color: #1e293b;
                    margin-bottom: 10px;
                }

                .done-container p {
                    color: #64748b;
                    line-height: 1.7;
                    margin-bottom: 25px;
                }
                
            `}</style>
        </div>
    );
}

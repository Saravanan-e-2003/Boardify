import React from "react";
import { jsPDF } from "jspdf";
import { GoogleGenAI } from "@google/genai";
import { Buffer } from 'buffer';


const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={
        type === "Boards"
          ? " absolute  top-16  right-5"
          : " absolute  top-6  right-4"
      }
    >
      <div className=" flex justify-end items-center">
        <div className=" w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg  h-auto pr-12">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer dark:text-gray-400 text-gray-700"
          >
            Edit {type}
          </p>

          <p
  onClick={async () => {
    try{
    const boardsData = localStorage.getItem("boardsData");

    if (boardsData) {
      const doc = new jsPDF();
      const data = JSON.stringify(JSON.parse(boardsData), null, 2);
      const lines = doc.splitTextToSize(data, 180);
      let y = 10;

      lines.forEach((line, index) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += 7;
      });

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);

      const pdfResp = await fetch(url).then((res) => res.arrayBuffer());

      const contents = [
        { text: `Provide me a report on how the project is going, what are the stuffs that need to be done by analyzing the document in an technical manner so that it can be presentable in
          corporate meetings, Provide me only the Contents no need for bold words and other decorations, Give report in each paragraph for each board in the document
          and an overall report paragrapgh, The report should be summary of what are the work done and estimated pacing to Project Manager (Only plain text no heading and sub-heading formating)` },
        {
          inlineData: {
            mimeType: "application/pdf",
            data: Buffer.from(pdfResp).toString("base64"),
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
      });

      // 🧠 Use a fresh instance here
      const doc1 = new jsPDF();
      const text = response.text;
      const lines1 = doc1.splitTextToSize(text, 180);
      let ylen = 10;

      lines1.forEach((line) => {
        if (ylen > 280) {
          doc1.addPage();
          ylen = 10;
        }
        doc1.text(line, 10, ylen);
        ylen += 7;
      });

      const blobUrl = doc1.output("bloburl");
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "report.pdf";
      link.click();
    } else {
      alert("No board data found in local storage.");
    }
  }catch{
    console.error("PDF generation failed:");
  }}}
  className="text-xs cursor-pointer dark:text-green-300 text-green-700"
>
  Generate Report
</p>

          <p
            onClick={() => setOpenDeleteModal()}
            className=" cursor-pointer text-red-500"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;

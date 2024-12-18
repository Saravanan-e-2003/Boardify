import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header"
import Home from "./Home";
import EmptyBoard from './EmptyBoard';
import boardsSlice from "../redux/boardsSlice";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ?
        <>
        <Header
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
        />
        <Home
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
        />
        </>
        :
        <>
          <EmptyBoard type='add'/>
        </>
      }
        
      </>
    </div>
  );
}

export default MainPage;


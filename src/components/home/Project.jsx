import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import ls60 from "../../assets/projects/ls60.png";
import ls82 from "../../assets/projects/ls82.png";
import ls84 from "../../assets/projects/ls84.png";
import ls68 from "../../assets/projects/ls68.png";
import ls107 from "../../assets/projects/ls107.png";
import ls127 from "../../assets/projects/ls127.png";
import ls131 from "../../assets/projects/ls131.png";
import mobileNoti from "../../assets/projects/mobile-noti.png";
import samsung from "../../assets/projects/samsung.png";
import appInstallBanner from "../../assets/projects/app-install-banner.png";
import searchPerson from "../../assets/projects/searchPerson.png";
import profileUi from "../../assets/projects/profileUi.png";
import recPeople from "../../assets/projects/recPeople.png";
import bookmark from "../../assets/projects/bookmark.png";
import privateNoti from "../../assets/projects/privateNoti.png";
import highlightStreak from "../../assets/projects/highlightStreak.png";
const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: null,
  pushed_at: null,
};
const API = "https://api.github.com";
// const gitHubQuery = "/repos?sort=updated&direction=desc";
// const specficQuerry = "https://api.github.com/repos/hashirshoaeb/";

const PROJECTS = [
  {
    name: "LS60-하이라이트 컬러 테마",
    description: "라이너 제품의 하이라이트 컬러 테마 및 라벨 기능 추가",
    imgUrl: ls60,
    mainText: "첫 프로젝트, 많이 어리숙했고 많이 배웠다.",
  },
  {
    name: "모바일 알림",
    description: "앱 개편에 사용 될 알림 탭 개발",
    imgUrl: mobileNoti,
    mainText: "이게 이렇게 오래 걸릴 일이었을까...??",
  },
  {
    name: "LS82-BE 가입 전환율 증대 실험",
    description: "라이너 웹 페이지 가입 전환율 증대를 위한 코호트 실험",
    imgUrl: ls82,
    mainText: "가장 마음 아픈 프로젝트.... 실수를 넘 많이 함...ㅜ",
  },
  {
    name: "LS84-getliner.com 웹 개편",
    description: "getliner.com 2.0",
    imgUrl: ls84,
    mainText: "첫 장기 프로젝트, 나름 성공적...?",
  },
  {
    name: "삼성 인터넷 익스텐션 온보딩 개선",
    description: "삼성 인터넷 익스텐션 온보딩 속도 개선 및 이탈율 개선",
    imgUrl: samsung,
    mainText: "세상에 안되는 개발은 없다",
  },
  {
    name: "LS68-getliner.com 앱 개편",
    description: "getliner.com App 2.0",
    imgUrl: ls68,
    mainText: "버그 나면 고치면 그만이야~",
  },
  {
    name: "LS107-웹 푸시 노티",
    description: "커뮤니티 기능과 결합한 웹 푸시",
    imgUrl: ls107,
    mainText: "페이지 밖의 세상은 멋지다, 애정이 가는 프로젝트",
  },
  {
    name: "앱 설치 유도 배너",
    description: "라이너 앱 2.0 홍보 배너",
    imgUrl: appInstallBanner,
    mainText: "너무 개발에만 집중하지 않았나...??",
  },
  {
    name: "LS127-하이라이트 묶음",
    description: "개별 하이라이트 레거시 개선",
    imgUrl: ls127,
    mainText: "가장 힘들었던 프로젝트... 좋은 정신 상태가 좋은 코드를 낳는다",
  },
  {
    name: "인물 검색",
    description: "라이너 앱에 인물 검색 기능 추가",
    imgUrl: searchPerson,
    mainText: "하루 컷, 성공적",
  },
  {
    name: "LS131-이메일 통한 인물 추천",
    description: "가입 이메일 도메인 기반 인물 추천",
    imgUrl: ls131,
    mainText:
      "퀄리티 챙기면서 개발하는게 확실히 더 재밌는 것 같다. 성장하는 느낌?",
  },
  {
    name: "프로필 UI 변경",
    description: "프로필에 background Img, mutual 등 추가 및 UI 개선",
    imgUrl: profileUi,
    mainText: "이미지 다루는 것은 여전히 어렵다....",
  },
  {
    name: "관심사, mutual 기반 인물 추천",
    description: "관심사와 mutual 기반의 홈탭 인물 추천",
    imgUrl: recPeople,
    mainText: "마크업 잘하자..ㅎㅎ",
  },
  {
    name: "북마크 허들다운",
    description: "추천 문서 북마크 depth 줄이기",
    imgUrl: bookmark,
    mainText: "쉬웠으나, 어려운 길을 갔다... 그렇게 돌아 갈 일이었나??",
  },
  {
    name: "노티 개인화 설정",
    description: "private 노티 설정을 통한 원하는 알림 받기",
    imgUrl: privateNoti,
    mainText: "처음 해보는 일에 도전했을 떄 리턴에 제일 큰 것 같다",
  },
  {
    name: "하이라이트 잔디밭",
    description: "매일 가꿔 나가는 나만의 하이라이트 잔디밭",
    imgUrl: highlightStreak,
    mainText: "제일 재밌었던 프로젝트, 역시 난 프론트가 맞아",
  },
];

const Project = ({ heading, username, length, specfic }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;
  const dummyProjectsArr = new Array(length + specfic.length).fill(
    dummyProject
  );

  return (
    <Jumbotron fluid id="projects" className="bg-light m-0">
      <Container className="">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {PROJECTS.length
            ? PROJECTS.map((project, index) => (
                <ProjectCard
                  key={`project-card-${index}`}
                  id={`project-card-${index}`}
                  value={project}
                />
              ))
            : PROJECTS.map((project, index) => (
                <ProjectCard
                  key={`dummy-${index}`}
                  id={`dummy-${index}`}
                  value={project}
                />
              ))}
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Project;

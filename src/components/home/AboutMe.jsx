import React from "react";

import axios from "axios";
import { Jumbotron } from "./migration";

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = React.useState("");
  const [showPic, setShowPic] = React.useState(Boolean(link));
  // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  React.useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  return (
    <Jumbotron id="aboutme" className="m-0">
      <div className="container row">
        <div className="col-5 d-none d-lg-block align-self-center">
          {showPic && (
            <img
              className="border border-secondary rounded-circle"
              src={profilePicUrl}
              alt="profilepicture"
              width={imgSize}
              height={imgSize}
            />
          )}
        </div>
        <div className={`col-lg-${showPic ? "7" : "12"}`}>
          <h2 className="display-4 mb-5 text-center">{heading}</h2>
          <p className="lead text-center">
            <span>
              항상 성장에 관심을 갖고, 어제보다 더 발전하고자 하는 프론트엔드
              엔지니어 박재훈입니다.
            </span>
            <br />
            <span>
              <a
                href={"https://dsmhs.djsch.kr/main.do"}
                style={{ textDecoration: "none" }}
              >
                대덕소프트웨어마이스터고등학교
              </a>
              에서 소프트웨어 개발을 전공 후,
              <br />
              <a
                href={"https://getliner.com"}
                style={{ textDecoration: "none" }}
              >
                라이너
              </a>
              에서 근무하며 다양한 프로젝트에 참여하며 성장하고 있습니다.
              <br />
              항상 부끄럽지 않은 코드를 남기기 위해 노력하고 있고, 과거 자신의
              코드를 보며 개선점이 보이고, 고칠 때 가장 크게 희열을 느끼곤
              합니다.
              <br />
              커리어를 돌아보았을 때 <b>우상향하는</b> 개발자가 되고 싶습니다.
            </span>
          </p>
          {resume && (
            <p className="lead text-center">
              <a
                className="btn btn-outline-dark btn-lg"
                href={resume}
                target="_blank"
                rel="noreferrer noopener"
                role="button"
                aria-label="Resume/CV"
              >
                Resume
              </a>
            </p>
          )}
        </div>
      </div>
    </Jumbotron>
  );
};

export default AboutMe;

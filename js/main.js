// 서울미식주간 메인페이지 JS - main.js



////////////////////////////////////////// 로딩 구역 /////////////////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
    // console.log("메인js - 로딩 완료");

    /*********************** 주요프로그램 섹션의 스크롤 액션 ***********************/
    // 기능 : 주요 프로그램 섹션에 진입하기 전에는 이미지가 scale(0)이었다가, 스크롤되어 특정 위치 진입하면 scale(1)이 되어서 제자리에서 등장하도록 만들기
    const tg = document.querySelectorAll(".pl img");
    // console.log(pl);
    // 화면 높이값 구하기
    const hv = window.innerHeight;

    // 등장액션 대상 위치값 리턴 함수
    const retVal = (ele) => ele.getBoundingClientRect().top;
    // console.log(retVal);

    // .on클래스를 넣을 함수 만들기
    const showIt = (x) => {
        // 대상 요소의 현재 스크롤 위치 구하기
        let xval = retVal(x);

        // 구간 적용 여부 검사하기
        if (xval < hv && xval > 0) {
            // console.log("작동!!");
            x.classList.add("on");
        }
    };

    // 스크롤 액션 세팅하기
    window.addEventListener("scroll", () => {
        // pl들에 스크롤 액션 함수 적용하기
        for (let x of tg) showIt(x);

        // 현재 첫번째 이미지(tg변수)의 위치값을 tgpos변수에다 담기
        let tgpos = retVal(tg[0]);
        // console.log(tgpos);

        if (tgpos < hv && tgpos > 0) {
            // console.log("작동!!");

            // 위치값이 0이 되면 클래스 on을 줘서 등장하게 만들기
            tg[0].classList.add("on");
        }
    }); /////////////////////// 스크롤 액션 끝 /////////////////////////////////////


    /*********************** 2페이지 주요프로그램 소개 섹션의 li들 지그재그로 위치 변경하는 함수 ***********************/
    // 기능 : 윈도우 가로 사이즈가 1100px 이하가 되면, .programList(ul)의 li들이 세로 일렬 정렬에서 지그재그로 정렬을 바꾼다
    function zigzagFn(){
        const plLists = document.querySelectorAll(".programList li");
        // console.log(plLists);
        if(window.innerWidth <= 1100){
            plLists.forEach((ele, idx)=>{
                if(idx % 2 === 0){
                    ele.style.transform="translateX(15%)";
                }
                else{
                    ele.style.transform="translateX(-15%)";
                }
            })
        }

    } ///////////////////// zigzagFn //////////////////////
    // 함수 호출
    // zigzagFn();
    // window.addEventListener("resize", zigzagFn);


    /*********************** 2페이지 주요프로그램 소개 섹션의 배경 원 패럴렉스 함수 ***********************/
    // 기능 : 2페이지의 배경 원들이 시간차를 두고 스크롤업된다
    // const circleLists = document.querySelectorAll(".program .circle ");
    // console.log(circleLists);
    const handleRellax = ()=>{
        // console.log("패럴렉스");
        const rellax1 = new Rellax(".program .cr5", {speed: -2, percentage:0.5});
        const rellax2 = new Rellax(".program .cr6", {speed: 1, percentage:0.2});
        const rellax3 = new Rellax(".program .cr7", {speed: 3, percentage:0.8});
        const rellax4 = new Rellax(".program .cr8", {speed: -2, percentage:1});
        const rellax5 = new Rellax(".program .cr9", {speed: -1.5, percentage:0.3});
        const rellax6 = new Rellax(".program .cr10", {speed: 2, percentage:0.7});
        const rellax7 = new Rellax(".program .cr11", {speed: -3, percentage:0.9});
    }; ///////////////////// handleRellax 할당 함수 끝 ///////////////////////////
    
    // 최초 호출
    handleRellax();


    /*********************** 인디케이터 스크롤 액션 ***********************/
    // 기능 : 스크롤 위치에 따라서 인디케이터의 바가 채워진다
    const handleScrollIndicator = () => {
        const scrollIndicator = document.querySelector("#scroll-indicator");
        const maxHeight = document.body.scrollHeight - window.innerHeight;

        const widthPercentage = (window.scrollY / maxHeight) * 100;
        scrollIndicator.style.width = `${widthPercentage}%`;
    };

    // 이벤트 적용하기
    window.addEventListener("scroll", handleScrollIndicator);




    /******************************* 3페이지 지도 섹션의 가로 스크롤 이동되는 함수 *******************************/
    // 기능 : 스크롤바를 내리면 화면이 가로로 움직인다
    // 적용 대상 : .tpg, .slidePg
    // 타겟박스 : .tpg
    const hScrollBx = document.querySelector(".tpg");
    const hScrollSlide = document.querySelector(".hScrollTgBx");
    const moveBx = hScrollSlide.querySelector("ul");
    // console.log(hScrollBx, hScrollSlide);

    // 이벤트 세팅하기
    if(mob===0){
        window.addEventListener("scroll", hScrollFn);
    }

    // getBoundingClientRect() 값을 리턴받기
    const retRectVal = (x) => x.getBoundingClientRect().top;

    function hScrollFn() {
        // 스크롤 위치값 확인
        // console.log(window.scrollY);

        if(mob) return;

        let tgpos = retRectVal(hScrollBx);
        // console.log("바운딩값: ", tgpos);

        // 적용구간 설정하기 : 200이하 -3000px 이상
        if (tgpos <= 0 && tgpos >= -3000) {
            moveBx.style.left = tgpos + "px";
        } else if (tgpos > 0) {
            moveBx.style.left = "0";
        }
    } //////////////// hScrollFn 끝 /////////////////




    /******************************* 지도 섹션 배경 상단의 svg 변경 함수 *******************************/
    // 기능 : 스크롤바가 특정 위치에 오면 지도 섹션의 배경 상단에 있는 svg의 scaleY속성이 0.1에서부터 1까지 변화함
    // 변경 대상 : .circleStart>svg
    const svgScale = document.querySelector(".circleStart>svg");
    const winH = window.innerHeight;
    // 이벤트 종류 : 스크롤 이벤트

    function svgChgFn() {
        // console.log("해당 요소의 top 위치값: ", svgScale.getBoundingClientRect().top + window.scrollY);
        // console.log("현재 스크롤바 위치값: ", window.scrollY);

        let chkPos = retVal(svgScale);

        if (chkPos < winH && chkPos > 0) {
            // console.log(chkPos);
            let ratio = 1 - chkPos / winH;
            // console.log(ratio);
            svgScale.style.transform = `scale(1,${ratio})`;
        }
    }
    // 이벤트 적용하기
    window.addEventListener("scroll", svgChgFn);





    /*********************** 셰프&바텐더 소개 섹션의 스크롤 액션 ***********************/
    // 기능 : 셰프&바텐더 소개 섹션에 진입하기 전에는 셰프 이미지가 translateX(110%)이었다가, 스크롤되어 특정 위치 진입하면 translateX(0%)이 되어서 왼쪽에서 등장하도록 만들기
    const CnBIntroImgs = document.querySelectorAll(".introList img");
    const CnBIntroInRside = document.querySelector(".CnBIntro .rside");
    // console.log(CnBIntroImgs);

    // 화면 높이값의 10분의 9 지점 구하기 (메뉴있는 윗부분이 0 ~ 윈도우있는 아래쪽이 nnn값)
    const CnBIntro_hv = (window.innerHeight / 10) * 9;
    // console.log("화면 높이값의 10분의 9 지점은?: ", CnBIntro_hv);

    // 화면의 토탈 높이값 구하기
    const totalHv = window.innerHeight;
    // console.log("화면의 높이값: ", totalHv);

    function introFn() {
        // console.log("스크롤 중!");

        CnBIntroImgs.forEach((ele) => {
            let eleVal = retVal(ele);
            // console.log(eleVal);

            // 구간 적용 여부 검사하기
            if (eleVal < CnBIntro_hv && eleVal > 0) {
                // console.log("작동!!");
                ele.classList.add("appear");
                setTimeout(()=>{ele.setAttribute("data-ap", "1");}, 1000);
            }
        });
    }

    // 이벤트 세팅하기
    window.addEventListener("scroll", introFn);



    /******************************* 셰프&바텐더 소개 섹션의 셰프이미지 마우스오버 함수 *******************************/
    // 기능 : 클래스 on을 주어서! 셰프 이미지에 마우스오버하면 more 글씨가 나타나며 이미지가 조금 어두워진다!
    const CnBIntro_img = document.querySelectorAll(".introList>ul>li>a");
    const CnBIntro_moveMorBx = document.querySelectorAll(".moreContMoveBx");
    // console.log(CnBIntro_moveMorBx);

    // 이벤트 함수 만들기 : 마우스엔터시
    function mouseEnterFn(ele, seq){
        // console.log("more 등장하게 만들기!", ele.querySelector("img").getAttribute("data-ap"));
        let img_data_ap = ele.querySelector("img");

        // 주의! : 인덱스번호가 5번인 것은 more이란 글자밖에 없으니까 걔는 이 함수 적용 안되게 해야함!
        if(seq === 5){
            return;
        } //////////////////////// if : 인덱스번호 5번인 경우 ////////////////////////
        else{
            if(img_data_ap.getAttribute("data-ap") === "1"){
                // console.log("data-ap값은?: ", ele.querySelector("img").getAttribute("data-ap"));
                CnBIntro_moveMorBx[seq].classList.add("on");
            }
        } //////////////////// else : 그밖에 나머지인 경우 //////////////////////////
    } ////////////////// mouseEnterFn 함수 ///////////////////////

    
    // 이벤트 함수 만들기 : 마우스리브시
    function mouseLeaveFn(ele, seq){
        // console.log("more 등장하게 만들기!", seq);

        // 가져온 순번에 맞는 .moreContMoveBx를 찾아서 클래스 .on 빼기
        // 주의! : 인덱스번호가 5번인 것은 more이란 글자밖에 없으니까 걔는 이 함수 적용 안되게 해야함!
        if(seq===5) return;
        else{CnBIntro_moveMorBx[seq].classList.remove("on");}

    } ////////////////// mouseLeaveFn 함수 ///////////////////////

    // 이벤트 적용하기
    CnBIntro_img.forEach((ele, idx)=>{
        ele.addEventListener("mouseover", ()=>{mouseEnterFn(ele, idx)});
        ele.addEventListener("mouseout", ()=>{mouseLeaveFn(ele, idx)});
    }); //////////////////////// forEach //////////////////////////


    /******************************* 동영상 좌/우 버튼 클릭시 동영상 넘어가는 함수 *******************************/
    // 기능 : 좌/우 버튼 클릭하면 동영상 영상이 바뀜
    const prebtn = document.querySelector(".vArea .prebtn img");
    const nextbtn = document.querySelector(".vArea .nextbtn img");
    const screen = document.querySelector(".vArea iframe");
    // 동영상 번호 변수
    let vNum = 0;

    function playFn(sort) {
        // console.log("어떤거 클릭했어?: ", sort);

        // 다음 버튼 제어
        if (sort === "next") {
            // 동영상 번호 변수 1씩 증가시키기
            vNum++;

            // 동영상 번호 변수의 한계값 체크하기 (10이 되면 0으로 돌아가기)
            if (vNum === 11) vNum = 0;

            // 동영상 인덱스 번호 바꿔서 출력하기
            screen.setAttribute("src", `https://www.youtube.com/embed/${videoObj[vNum].vID}`);

            // console.log(vNum);
        } ///////////// if : nextbtn 클릭한 경우 //////////////////
        else {
            if (vNum === 0) vNum = 11;

            vNum--;

            // console.log(vNum);

            screen.setAttribute("src", `https://www.youtube.com/embed/${videoObj[vNum].vID}`);
        } //////////////// else : prebtn 클릭한 경우 //////////////////////////
    } //////////////// playFn() 함수 끝 /////////////////////

    // 이벤트 적용하기
    prebtn.onclick = () => {
        playFn("prev");
    };
    nextbtn.onclick = () => {
        playFn("next");
    };


    /******************************* 동영상 썸네일 클릭시 해당 동영상으로 바뀌는 함수 *******************************/
    // 기능 : 동영상 목록에 있는 썸네일을 클릭하면, 해당 동영상으로 바뀐다
    const thumbnailImg = document.querySelectorAll(".videoList li img");

    thumbnailImg.forEach((ele, idx) => {
        // console.log(ele);
        ele.onclick = () => {
            // console.log(idx);

            vNum = idx + 1;
            // console.log(vNum);
            screen.setAttribute("src", `https://www.youtube.com/embed/${videoObj[vNum].vID}`);

            // 모든 대상에서 on클래스 빼기
            for (let x of thumbnailImg) x.classList.remove("on");

            // 클릭된 요소에만 on클래스 넣기
            ele.classList.add("on");
        };
    });

    /******************************* 동영상 썸네일 목록 아래의 좌/우 버튼 클릭시 썸네일 목록 이동되는 함수 *******************************/
    // 기능 : 썸네일 목록 아래의 이전/다음 버튼을 클릭하면, 리스트 박스 내의 썸네일이 한개씩 좌우로 이동된다
    const thumbnailbtns = document.querySelectorAll(".movebtn div img");
    // console.log(thumbnailbtns);
    let clickNum = 0;
    const vSlide = document.querySelector(".vSection .videoList ol");

    // 광클금지(1-금지,0-허용)
    let prot_vslide = 0;

    thumbnailbtns.forEach((ele, idx) => {
        ele.onclick = () => {
            // 광클금지 ///////////
            if (prot_vslide) return;

            prot_vslide = 1; //잠금

            setTimeout(() => {
                prot_vslide = 0; // 해제
            }, 500);

            // console.log("누가 버튼 클릭했어? : ", idx);
            // 오른쪽 버튼 클릭한 경우
            if (idx === 1) {
                vSlide.style.transition = `transform .5s ease-in-out`;
                vSlide.style.transform = `translateX(-20%)`;
                // console.log("왼쪽 클릭했을때 숫자: ", clickNum);
                // 이동후 자르기
                setTimeout(() => {
                    let tg = vSlide.querySelectorAll("li");
                    vSlide.appendChild(tg[0]);
                    vSlide.style.transition = `none`;
                    vSlide.style.transform = `translateX(0%)`;
                }, 500);
            }
            // 왼쪽 버튼 클릭한 경우
            else {
                let tg = vSlide.querySelectorAll("li");
                vSlide.insertBefore(tg[tg.length - 1], tg[0]);
                vSlide.style.transition = `none`;
                vSlide.style.transform = `translateX(-20%)`;

                // 코드실행차주기
                setTimeout(() => {
                    vSlide.style.transition = `transform .5s ease-in-out`;
                    vSlide.style.transform = `translateX(0%)`;
                }, 1);
                // console.log("왼쪽 클릭했을때 숫자: ", clickNum);
                // 이동후 자르기
            }
            // console.log("클릭 다 하고 넘어간 숫자는?: ", clickNum);
        };
    });



    ////////////////////////// 화면 하단 오른쪽의 top버튼 링크 //////////////////////////
    /*********************************************************************
        함수명 : topLinkFn
        기능 : 화면 하단 오른쪽의 top버튼을 클릭하면 페이지 맨 위로 올라가기
    *********************************************************************/
    function topLinkFn(){
        const mainTopBtn = document.querySelector(".pageTopBtn");
        // console.log(mainTopBtn);

        mainTopBtn.addEventListener("click", ()=>{
            window.scrollTo(0,0);
        });

    } ///////////////////// topLinkFn 함수 끝 ///////////////////////////

    // 화면 하단 오른쪽의 top버튼 링크
    topLinkFn();




}); ////////////////////////////////// 로딩 구역 끝 /////////////////////////////////////////////////////

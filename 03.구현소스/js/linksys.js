/* 서울미식주간 링크 시스템 JS - linksys.js */
// : 메뉴 클릭하면 거기로 가게 만들기

/*********************************************************************************************************
    모든 a요소의 기본 기능을 막은 이유?
-이동해야하는 대부분의 태그들을 a요소로 감싸놨음
: 왜? 마우스 사용하지 않고도 편히 링크 타고 들어갈 수 있으면 해서! (탭으로도 포커스가 갔으면 해서!)
-툭하면 a요소 클릭돼서 상단으로 이동하는게 불편해서, 그냥 전부 다 막아둠 ㅠㅠ...ㅎㅎ
->>각 요소들 링크를 js로 걸어야 할 것 같음^_^...
*********************************************************************************************************/

////////////////////////////////// 📢로딩 구역📢 //////////////////////////////////////////
window.addEventListener("DOMContentLoaded", loadingLinkSysFn);

function loadingLinkSysFn() {
    // 호출 확인
    console.log("링크시스템js - 로딩 완료!");

    // 상단 로고 링크
    topLogoLinkFn();

    // 사이트맵 상위 메뉴 관련 링크
    siteMapTopLinkFn();

    // 사이트맵 하위 메뉴 관련 링크
    siteMapLinkFn();

    // 미식 지도 섹션 링크
    mapSectionLinkFn();

    // 프로그램소개 페이지의 lnb 링크
    programIntroLinkFn();

    // 6페이지 더보기 버튼 링크
    moreLinkFn();

    // 하단영역 링크
    footerLinkFn();

    // 메인페이지 프로그램소개 링크
    prgLinkFn();
} ///////////////////// loadingLinkSysFn 함수 끝 ////////////////////////

////////////////////////// 상단 로고 링크 //////////////////////////
/*********************************************************************
    함수명 : topLogoLinkFn
    기능 : 상단의 로고 클릭하면 index.html로 연결하기
*********************************************************************/
function topLogoLinkFn() {
    const topLogoImg = document.querySelector(".topArea .logo img");
    // console.log(topLogoImg);
    topLogoImg.addEventListener("click", () => {
        location.href = "./index.html";
    });
} /////////////////////// topLogoLinkFn 함수 끝 ////////////////////////////


////////////////////////// 사이트맵 섹션 상위메뉴 링크 //////////////////////////
/*********************************************************************
    함수명 : siteMapTopLinkFn
    기능 : 사이트맵 섹션의 상위메뉴 클릭시 링크 이동하기
*********************************************************************/
function siteMapTopLinkFn(){
    const siteMapTopMenu = document.querySelectorAll(".siteMapGnbBx>ul>li>a");
    // console.log(siteMapTopMenu);
    if(!mob){
        siteMapTopMenu.forEach((ele, idx)=>{
            // console.log(idx);
            ele.addEventListener("click", ()=>{
                console.log(idx);
    
                switch(idx){
                    case 0 : location.href = "./sub_eventInfo.html"; break;
                    case 1 : location.href = "./sub_open.html"; break;
                    case 2 : location.href = "./sub_open.html"; break;
                    case 3 : location.href = "./sub_tasteOfSeoulAward.html"; break;
                    case 4 : location.href = "./sub_open.html"; break;
                }
            });
        }); //////////////////// forEach /////////////////////

    }
} /////////////////////////// siteMapTopLinkFn 함수 끝 //////////////////////////////




////////////////////////// 메인페이지 프로그램소개 섹션 링크 //////////////////////////
/*********************************************************************
    함수명 : prgLinkFn
    기능 : 메인페이지의 프로그램 소개 섹션에 있는 링크 이미지를 클릭하면 해당 페이지로 넘어가기
*********************************************************************/
function prgLinkFn() {
    const programLists = document.querySelectorAll(".pl");
    // console.log(programLists);
    programLists.forEach((ele, idx) => {
        ele.addEventListener("click", () => {
            // console.log(ele);
            switch (idx) {
                case 0:
                    location.href = "./sub_tasteOfSeoulAward.html";
                    break;
                case 1:
                    location.href = "./sub_seoulRestaurantWeek.html";
                    break;
                case 2:
                    location.href = "./sub_seoulMarketDining.html";
                    break;
                case 3:
                    location.href = "./sub_seoulMarché.html";
                    break;
                case 4:
                    location.href = "./sub_programOpen.html";
                    break;
                case 5:
                    location.href = "./sub_programOpen.html";
                    break;
                case 6:
                    location.href = "./sub_programOpen.html";
                    break;
            }
        });
    });
} /////////////////////////////// prgLinkFn 함수 끝 ////////////////////////////////////

////////////////////////// 사이트맵 링크 //////////////////////////
/*********************************************************************
    함수명 : siteMapLinkFn
    기능 : 사이트맵 화면에서 각 하위 메뉴 클릭시 각각에 맞는 서브페이지로 이동하기
    (구현한 페이지 이외의 메뉴 클릭하면 알람창 띄우기)
*********************************************************************/
function siteMapLinkFn() {
    // 이벤트 대상 : smenu ol ul li? 아니면 a?
    // 이벤트 종류 : 클릭 이벤트
    const lnb = document.querySelectorAll(".smenu li a");
    // console.log(lnb);
    let lnbTxt = "";

    lnb.forEach((ele) => {
        ele.addEventListener("click", () => {
            lnbTxt = ele.innerText;
            // console.log("클릭한거 맞아?ㅠㅠ: ", lnbTxt);

            switch (lnbTxt) {
                case "행사 소개":
                    location.href = "./sub_eventInfo.html";
                    break;
                case "주요 프로그램 소개":
                    location.href = "./sub_programInfo.html";
                    break;
                case "테이스트오브서울 어워즈":
                    location.href = "./sub_tasteOfSeoulAward.html";
                    break;
                case "특별 메뉴로의 초대":
                    location.href = "./sub_seoulRestaurantWeek.html";
                    break;
                case "재래시장과 핫플의 맛남":
                    location.href = "./sub_seoulMarketDining.html";
                    break;
                case "도시와 농부의 맛남":
                    location.href = "./sub_seoulMarché.html";
                    break;
                case "미식과 영화의 맛남":
                    location.href = "./sub_programOpen.html";
                    break;
                case "전통주와의 맛남":
                    location.href = "./sub_programOpen.html";
                    break;
                case "해외 셰프와 서울 셰프의 맛남":
                    location.href = "./sub_programOpen.html";
                    break;

                default:
                    alert("공사중입니다😊");
            } //////////////// switch문 끝 /////////////////////
        }); /////////////// click 이벤트 끝 ///////////////////
    }); ///////////////////// forEach문 끝 //////////////////////////
} ///////////////////// siteMapLinkFn 함수 끝 ///////////////////////

////////////////////////// 미식 지도 섹션 링크 //////////////////////////
/*********************************************************************
    함수명 : mapSectionLinkFn
    기능 : 지도 섹션의 a요소 아래 있는 자식요소들을 클릭하면 해당되는 지도가 아래쪽에 뜬다
*********************************************************************/
function mapSectionLinkFn() {
    // 대상 : li.btn의 모든 자식 요소들 (span과 a가 있음)
    // li로 잡지 않은 이유 : li 범위가 넓어서 빈공간 클릭해도 먹히기 때문
    const mapSectionBtn = document.querySelectorAll(".btn *");
    const mapIframe = document.querySelectorAll(".mapScreen>iframe");
    // console.log("지도 버튼: ", mapSectionBtn);
    // console.log(mapIframe);
    mapSectionBtn.forEach((ele) => {
        // 각 클래스를 가지고 있으면 링크 이동하도록 만들기
        ele.onclick = (e) => {
            // a요소 기본기능 막기
            e.preventDefault();
            // 클래스로 구분하여 각 아이프레임에 맞게 설정하기
            if (ele.classList.contains("m1")) mapIframe[0].setAttribute("src", "https://www.google.com/maps/d/embed?mid=1xzqc2HSERGDfc_wBaSjM-nw2fhxQvQU&ehbc=2E312F");
            else if (ele.classList.contains("m2")) mapIframe[0].setAttribute("src", "https://m.place.naver.com/my/place/detailList/5547ebf11e0342f1af46e528d06490b3?external=true");
            else if (ele.classList.contains("m3")) mapIframe[1].setAttribute("src", "https://www.google.com/maps/d/embed?mid=1mIn4mr_coXw3gmCgtW0YFnR_cK6NvQ4&ehbc=2E312F");
            else if (ele.classList.contains("m4")) mapIframe[1].setAttribute("src", "https://m.place.naver.com/my/place/detailList/e262371abc914bb389010164ac6b3934?external=true");
        }; //////////////// onclick /////////////////////
    }); /////////////// forEach ///////////////////
} //////////////////// mapSectionLinkFn 함수 끝 ////////////////////////





////////////////////////// 서브페이지 - 프로그램소개 페이지 링크 //////////////////////////
/*********************************************************************
    함수명 : programIntroLinkFn
    기능 : 서브페이지 - 프로그램 소개 페이지에서의 a요소들 링크 걸기
*********************************************************************/
function programIntroLinkFn() {
    // 대상 : 프로그램 소개 페이지에서의 .programPageLnb 밑의 li들
    const programPageLnbs = document.querySelectorAll(".programPageLnb>ul>li");
    // 이벤트 종류 : 클릭 이벤트

    // console.log("프로그램 페이지 아래 li들 링크", programPageLnbs);

    programPageLnbs.forEach((ele, idx) => {
        ele.addEventListener("click", () => {
            // console.log(idx);
            switch (idx) {
                case 0:
                    location.href = "./sub_tasteOfSeoulAward.html";
                    break;
                case 1:
                    location.href = "./sub_seoulRestaurantWeek.html";
                    break;
                case 2:
                    location.href = "./sub_seoulMarketDining.html";
                    break;
                case 3:
                    location.href = "./sub_seoulMarché.html";
                    break;
                case 4:
                    location.href = "./sub_programOpen.html";
                    break;
                case 5:
                    location.href = "./sub_programOpen.html";
                    break;
                case 6:
                    location.href = "./sub_programOpen.html";
                    break;
            }
        });
    });
} ////////////////////////// programIntroLinkFn 함수 /////////////////////////////



////////////////////////// 6페이지 공지사항과 보도자료 링크 //////////////////////////
/*********************************************************************
    함수명 : moreLinkFn
    기능 : 공지사항과 보도자료 옆 +버튼을 클릭하면 링크 이동하기
*********************************************************************/
function moreLinkFn(){
    const moreBtn = document.querySelectorAll(".moreBtn");
    // console.log(moreBtn);
    moreBtn.forEach((ele, idx)=>{
        ele.addEventListener("click", ()=>{
            // console.log(idx);
            if(idx){
                location.href = "./sub_open.html";
            }
            else{
                location.href = "./sub_open.html";
            }
        }) ////////////// click 이벤트 ////////////////
    }); ///////////// forEach //////////////
} ////////////////////////////// moreLinkFn 함수 끝 ///////////////////////////////////






////////////////////////// 하단 링크 //////////////////////////
/*********************************************************************
    함수명 : footerLinkFn
    기능 : 하단영역의 각 a요소들 링크 구현하기
*********************************************************************/
function footerLinkFn() {
    const bLink = document.querySelectorAll(".blink a");
    // console.log("하단 링크 a: ", bLink);
    bLink.forEach((ele, idx) => {
        ele.addEventListener("click", () => {
            // console.log("클릭한거 맞지?", idx);
            switch (idx) {
                case 0:
                    window.open("https://www.seoul.go.kr/main/index.jsp");
                    break;
                case 1:
                    window.open("https://www.facebook.com/tasteofseoul.official");
                    break;
                case 2:
                    window.open("https://www.instagram.com/tasteofseoul_official/");
                    break;
                case 3:
                    location.href = "./sub_RejectionEmail.html";
                    break;
                case 4:
                    location.href = "./sub_PrivacyPolicy.html";
                    break;
            } ////////////////// switch 끝 //////////////////////
        }); ////////////// click 끝 //////////////////
    }); /////////////////// forEach() 끝 ////////////////////
} ///////////////////// footerLinkFn 함수 끝 ///////////////////////////

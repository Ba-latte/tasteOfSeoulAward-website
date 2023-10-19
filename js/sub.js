/* 서울미식주간 서브페이지 JS - sub.js */

////////////////////////////////// 로딩 구역 //////////////////////////////////////////
window.addEventListener("DOMContentLoaded", lodingCategoryFn);

function lodingCategoryFn() {
    console.log("서브페이지 js - 로딩 완료");

    // 함수 호출
    categoryFn();
} ///////////////// lodingCategoryFn 함수 /////////////////

/*********************************************************************
    함수명 : categoryFn
    기능 : 해당 카테고리 링크를 클릭하면 특정 부분에 데이터가 들어간다
*********************************************************************/
function categoryFn() {
    // console.log("나야나");
    // 변경 대상
    // 1.서브타이틀
    const subTitInCategory = document.querySelector(".categoryTit>p:nth-of-type(1)");
    // 2.타이틀
    const titInCategory = document.querySelector(".sectionContBx .categoryTit>h6");
    // 3.간략 소개
    const shortIntro = document.querySelector(".categoryTit>p:nth-of-type(2)");
    // 4.날짜와 장소
    const dateAndSpot = document.querySelector(".dateAndLocation");
    // 5.대상
    const tg_em = document.querySelector(".categorySummary>ul>li>em");
    // 6.상세 소개
    const detailedIntro = document.querySelector(".categoryTxtBx>p");

    // 호출 확인
    // console.log(subTitInCategory);

    let tg_title = "0";
    // 💥💥💥💥💥💥페이지 내의 내비게이션에서 텍스트 읽어오기 ->> 왜 하나도 없다고 나오지??
    const temp_title = document.querySelectorAll(".sectionLnbBx .programPageLnb ul li");
    // console.log(temp_title);

    temp_title.forEach((ele) => {}); /////////////////// forEach //////////////////////

    // 데이터 객체에서 값 선택하기
    // const sub_data = subPgObj[tg_title];
    // console.log(sub_data);
    let sub_subTit = subPgObj["테이스트오브서울 어워즈"]["서브타이틀"];
    // console.log(sub_subTit);

    // 값 집어넣기
    subTitInCategory.innerHTML = "엥 왜 안들어가지지?ㅠㅠ";
} ///////////////////////////////// categoryFn 함수 ////////////////////////////////////


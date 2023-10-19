// 내비게이션 유형 06 : 배너 세팅 JS - banner.js //

window.addEventListener("DOMContentLoaded", ()=>{
    // console.log("배너 js - 로딩완료");

    // ⭐1.최상위 배너 박스 대상 선정하기 :.banbx
    const banbx = document.querySelector(".banbx");

    // 배너 세팅함수 호출하기
    setBan(banbx);

    // 불릿 클릭시 배너 바뀌는 함수 호출
    setIndicLinkFn(banbx);

}); ///////////////// 로드 구역 ///////////////////////



// 배너 세팅 함수 //////////////////////////////
function setBan(obj){
    // console.log("배너");

    const bancont = obj.querySelector(".bancont");

    // 태그 변수
    let hcode = `<ul class="slide">`;
    
    for(let i = 1; i <= 7; i++){
        hcode += `
            <li>
                <img src="./assets/images/02.서브페이지-22년행사및주요프로그램소개이미지/info-rolling-img${i}.jpg" alt="배너 이미지">
            </li>
        `;

    } ///////////////////// for문 끝 ///////////////////////////////

    
    hcode += `</ul>`;

    bancont.innerHTML = hcode;


    ////////// [ ✨✨슬라이드 기본 기능 구현✨✨ ] /////////////

    // 1. 대상선정 //////////////////////////
    const abtn = obj.querySelectorAll(".abtn");
    const slide = obj.querySelector(".slide");
    let slist = obj.querySelectorAll(".slide>li");


    // [ 초기화1 - 순번붙이기 ] ///////////////////
    slist.forEach((ele, idx) => {
        ele.setAttribute("data-seq", idx);
    }); ////// forEach /////////////////

    // [ 초기화2 - 맨뒤요소 맨앞으로 이동 2번하기 ] ///////////////////
    const chgSeq = () => {
        slist = obj.querySelectorAll(".slide>li");
        slide.insertBefore(slist[slist.length - 1], slist[0]);
    }; ////////// chgSeq함수 ///////////

    // 2번 맨뒤 맨앞이동 함수 호출하기
    for (let i = 0; i < 2; i++) chgSeq();

    // 광클금지변수 : 0 - 허용, 1 - 불허용
    let prot = 0;

    // 슬라이드 변경함수 만들기
    // 호출시 seq에 들어오는 값중 1은 오른쪽, 0은 왼쪽
    const goSlide = (seq) => {

        // 광클금지 설정하기 //////
        if (prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 해제!
        }, 800); /// 0.4초후 해제! ///


        let clist = slide.querySelectorAll("li");

        // 방향에 따른 분기
        // 1. 오른쪽버튼 클릭시 ////////////////
        if (seq) {
            // console.log("오른쪽");

            slide.appendChild(clist[0]);
            slide.style.left = "-110%";
            slide.style.transition = "none";

            // 코드분리
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .8s ease-in-out";
            }, 1); //// 타임아웃 //////
        } //////////// if : 오른쪽클릭시 //////

        // 2. 왼쪽버튼 클릭시 //////////////
        else {
            // console.log("왼쪽");

            slide.insertBefore(clist[clist.length - 1], clist[0]);
            slide.style.left = "-330%";
            slide.style.transition = "none";

            // 코드분리
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .8s ease-in-out";
            }, 0); ////// 타임아웃 /////////
        } //////////// else : 왼쪽클릭시 //////

        // 현재 슬라이드 순번과 같은 블릿표시하기
        const indic = document.querySelectorAll(".programLnb .indic a");
        // 현재 배너리스트 업데이트하기
        clist = slide.querySelectorAll("li");

        let cseq = clist[2].getAttribute("data-seq");
        // console.log("현재순번:", cseq);

        // 블릿초기화
        for (let x of indic) x.classList.remove("on");

        // 읽어온 슬라이드 순번의 블릿에 클래스 "on"넣기
        indic[cseq].classList.add("on");
    }; ////////// goSlide함수 ///////////

    // 이동버튼대상에 이벤트 설정하기
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 기본이동막기
            event.preventDefault();
            // 슬라이드 함수 호출
            goSlide(idx);
        }; ///// click함수 //////
    }); /////// forEach //////////

    // 인터발함수 지우기위한 변수
    let autoI;
    // 타임아웃함수 지우기위한 변수
    let autoT;


    /************************************ 
        함수명: autoSlide
        기능: 인터발함수로 슬라이드함수 호출
    ************************************/
    function autoSlide() {
        // console.log("인터발 시작");
        // 인터발함수로 슬라이드함수 호출하기
        autoI = setInterval(() => goSlide(1), 3000);
    } ////////////// autoSlide함수 //////////


    /************************************ 
        함수명: clearAuto
        기능: 인터발함수를 지우고 다시셋팅
   ************************************/
    function clearAuto() {
        // console.log("인터발 멈춤");
        // 인터발 지우기
        clearInterval(autoI);

        // 타임아웃 지우기 : 지우지 않으면 쌓여서 타임아웃 쓰나미실행이 발생
        clearTimeout(autoT);

        // 잠시후 다시 작동하도록 타임아웃으로 인터발함수를 호출 : 5초후(인터발은 3초후, 토탈 8초후 작동시작)
        autoT = setTimeout(autoSlide, 5000);
    } ///////// clearAuto 함수 /////////////

    
} //////////////// setBan 함수 끝 ///////////////



function setIndicLinkFn(obj){
    const slide = obj.querySelector(".slide");
    const indic = document.querySelectorAll(".programLnb .indic a");
    let iseq = 0;
    // console.log(indic);

    // console.log(clist);
    
    indic.forEach((ele, idx)=>{
        
        ele.addEventListener("click", ()=>{
            let clist = slide.querySelectorAll("li");

            // 클릭된 순번
            let click_seq = idx;
            // 현재 순번 - iseq
            // 순번차이 : 클릭된 순번 - 현재 순번
            let diff = click_seq - iseq;
            // 절대값으로 만들기
            let pure = Math.abs(diff);

            // console.log("클릭된순번: ", click_seq);
            // console.log("현재순번", iseq);
            // console.log("순번차: ", diff);
            // console.log("순수한 차이값: ", pure);


            slide.appendChild(clist[0]);
            slide.style.left = "-110%";
            slide.style.transition = "none";
            
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .8s ease-in-out";
            }, 1); //// 타임아웃 //////

        }); ////////////////// click ///////////////////////

    }); ////////////////// forEach ///////////////////////
} /////////////////////////////// setIndicLinkFn 함수 끝 ////////////////////////////////


function indicClickFn(obj) {
    const indic = document.querySelectorAll(".programLnb .indic a");
    const slide = obj.querySelector(".slide");
    // console.log(indic);

    indic.forEach((ele, idx)=>{
        ele.addEventListener("click", ()=>{
            // 클릭된 순번
            let click_seq = idx;
            // 현재 순번 - iseq
            // 순번차이 : 클릭된 순번 - 현재 순번
            let diff = click_seq - iseq;
            // 절대값으로 만들기
            let pure = Math.abs(diff);

            // console.log("클릭된순번: ", click_seq);
            // console.log("현재순번", iseq);
            // console.log("순번차: ", diff);
            // console.log("순수한 차이값: ", pure);

            // 방향별 슬라이드 이동하기
            // 오른쪽 이동 ///////////////////
            if(diff > 0){
                // 오른쪽 버튼 클릭시 다음 슬라이드가 나타나도록 슬라이드 박스의 left값을 (-100% * 절대값)으로 변경하기
                slide.style.left = -100 * pure + "%";
                slide.style.transition = "left .8s ease-in-out";

                // 슬라이드 이동 후 (=0.8초 후) 작동할 타임아웃
                setTimeout(() => {
                    let temp = pure;

                    for(let i = 0; i < pure; i++){
                        temp--;

                        // 바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨 뒤로 보내기
                        slide.appendChild(slide.querySelectorAll("li")[0]);
                        // 동시에 left값을 0으로 변경해서 잘라낸거 끝에다가 붙이기
                        slide.style.left = -100 * temp + "%";
                        // 트랜지션 없애기
                        slide.style.transition = "none";
                    } //////////////////// for문 //////////////////////
                }, 800); //////////////// setTimeout ///////////////////
            } /////////////////////// if : 오른쪽 이동하는 경우 ///////////////////////////
            
            // 왼쪽 이동 ///////////////////
            else if (diff < 0) {
                // 왼쪽버튼 클릭시 이전 슬라이드가 나타나도록 하기 위해 우선 맨뒤의 li를 맨 앞으로 이동시키기
                
                for(let i = 0; i < pure; i++){
                    // 이동할 리스트 변수
                    let clist = slide.querySelectorAll("li");

                    // 동시에 left값을 -100%로 변경하기
                    slide.style.left = ((i+1) * -100) + "%";

                    slide.insertBefore(clist[clist.length - 1], clist[0]);
                } ///////////////// for문 ///////////////////

                slide.style.transition = "none";

                // 슬라이드가 왼쪽에서 들어오게 만듦
                // 시간차 주고 분리하기
                setTimeout(() => {
                    slide.style.left = "0";
                    slide.style.transition = "left .8s ease-in-out";
                }, 1); ///////////////// setTimeout //////////////////////////////
            } ///////////////////// else if : 왼쪽으로 이동하는 경우 ////////////////////////////
            // 0이면 나가게 만들기
            else{return;}

            // 현재 변경 불릿 초기화하기
            indic[iseq].classList.remove("on");

            // 클릭된 순번으로 현재 순번을 변경하기
            iseq = click_seq;

            // 클릭된 불릿에 on넣기
            indic[iseq].classList.add("on");


        }); //////////////////// click ///////////////////////
    }); //////////////// forEach ////////////////////
} /////////////////////////////// indicClickFn 함수 끝 ///////////////////////////////



/*****************************************
    함수명 : dragFn
    기능 : 다중 드래그 기능 적용
*****************************************/
function dragFn(obj) {
    // console.log("드래그");

    // 드래그 상태 변수 - true:드래그 중 / false:드래그 안함
    let drag = false;
    let firstX, firstY;

    // 슬라이드의 처음 left값 세팅하기
    let leftX = obj.offsetLeft;
    let leftY = 0;

    // 움직일 때 위치 포인트
    let moveX, moveY;
    // 위치 이동한 차이값을 저장할 변수
    let resultX, resultY;

    // 드래그 상태가 true인 변수
    const dragT = () => {
        drag = true;
    };
    // 드래그 상태가 false인 변수
    const dragF = () => {
        drag = false;
    };
    // 드래그 작동할 때의 작동 함수
    const dragMove = () => {
    // console.log("드래그 상태", drag);

    // 드래그 상태일때만 실행하기
    if (drag) {
        // 트랜지션 없애기
        obj.style.transition = "none";

        // 드래그한 상태에서 움직일 때의 위치값 : moveX,Y
        moveX = event.pageX;
        moveY = event.pageY;

        // 움직일 때의 위치값 - 처음위치값 = resultX,Y에 담기
        resultX = moveX - firstX;
        resultY = moveY - firstY;

        // 움직인 x,y값을 타겟 요소에 적용하기
        obj.style.left = resultX + leftX + "px";
    } //////////////////// if : 드래그 /////////////////////////
    };
    // 첫번째 위치 포인트 세팅하는 함수 : 처음 찍었을 때 작동하는 것
    const firstPoint = () => {
        firstX = event.pageX;
        firstY = event.pageY;
    };
    // 마지막 위치 포인트 세팅하는 함수 : 클릭버튼에서 손 뗄 때 작동하는 것
    const lastPoint = () => {
        leftX += resultX;
        leftY += resultY;
    };
    // 최종 이동 결과값인 resultX,Y값을 항상 대입연산해서 값을 업데이트 해주기

    // 이벤트 등록하기
    // 마우스 내려갈때 : 드래그 true + 첫번쨰 위치값 업데이트하기
    obj.addEventListener("mousedown", () => {
        // 드래그 true
        dragT();
        // 첫번째 위치값 업데이트
        firstPoint();

        // event.preventDefault();
    });
    // 마우스 올라올 때 : 드래그 false + 마지막 위치값 업데이트하기
    obj.addEventListener("mouseup", () => {
        // 드래그 false
        dragF();

        // 드래그 이동방향 판별하는 함수 호출하기
        whereDrag(obj);
    });

    // 마우스 움직일 때
    obj.addEventListener("mousemove", dragMove);
    // 마우스 벗어날 때
    obj.addEventListener("mouseleave", dragF);


    // 화면 크기 변경할 경우 발생하는 resize 이벤트
    // 필요할 경우 이 코드 실행하기
    window.addEventListener("resize", ()=>{
        leftX = -obj.parentElement.clientWidth * 2.2;
    }); //////////////// resize 이벤트 끝 /////////////////


} //////////////////// dragFn 함수 /////////////////////////



/************************************************************
    함수명 : whereDrag
    기능 : 드래그시 왼쪽으로 갈 것인지, 오른쪽으로 갈 것인지 이동 방향을 판별해준다
    호출 : 드래그시 mouseup 이벤트 함수에서 호출한다
************************************************************/
function whereDrag(obj) {
    // 현재 드래그 대상의 left 위치값
    let tg_left = obj.offsetLeft;

    // 유동적 사이즈 변경에 따른 위치값 구하기
    let tg_point = obj.parentElement.clientHeight * 2.2;

    // 방향 판별하기 : 특정값을 더하거나 빼기
    // 왼쪽 방향으로 이동하기 = 오른쪽 버튼 클릭 기능과 동일함
    if (tg_left < tg_point - 50) {
        // console.log("왼쪽으로");
        dragFn(1);
    }
    // 오른쪽 방향 이동하기 = 왼쪽 버튼 클릭 기능과 동일함
    else if (tg_left > tg_point + 50) {
        // console.log("오른쪽으로");
        dragFn(0);
    } else {
        // console.log("제자리로");

        // 기준값 left로 다시 보내기
        obj.style.left = -tg_point + "px";

        // 트랜지션을 줘서 부드럽게 움직이게 만들기
        obj.style.transition = "left .2s ease-in-out";
    }
} ////////////////////////////// whereDrag 함수 끝 ///////////////////////////

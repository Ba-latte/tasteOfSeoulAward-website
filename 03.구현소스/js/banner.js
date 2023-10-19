// 내비게이션 유형 06 : 배너 세팅 JS - banner.js //

window.addEventListener("DOMContentLoaded", ()=>{
    console.log("배너 js - 로딩완료");

    // ⭐1.최상위 배너 박스 대상 선정하기 :.banbx
    const banbx = document.querySelector(".banbx");

    // 배너 세팅함수 호출하기
    setBan(banbx);

    // 불릿 클릭시 배너 바뀌는 함수 호출
    // indicClickFn(banbx);
    setIndicLinkFn(banbx);

}); ///////////////// 로드 구역 ///////////////////////



// 배너 세팅 함수 //////////////////////////////
function setBan(obj){ // obj는 최상위 요소 객체! / seq는 요소 순번!
    // 1.호출 확인
    // console.log("배너야~!");

    // 2.대상 선정 : .bancont
    const bancont = obj.querySelector(".bancont");
    // console.log(bancont);

    // 3.태그 구성하기
    // 태그 변수
    let hcode = `<ul class="slide">`;
    
    for(let i = 1; i <= 7; i++){
        hcode += `
            <li>
                <img src="../00.자료수집/02.이미지데이터/02.서브페이지-22년행사및주요프로그램소개이미지/info-rolling-img${i}.jpg" alt="배너 이미지">
            </li>
        `;

    } ///////////////////// for문 끝 ///////////////////////////////

    
    hcode += `</ul>`;
    // console.log(hcode);

    // 4.bancont에 출력하기
    bancont.innerHTML = hcode;


    ////////// [ ✨✨슬라이드 기본 기능 구현✨✨ ] /////////////

    // 1. 대상선정 //////////////////////////
    // 1-1. 이벤트 대상: .abtn
    const abtn = obj.querySelectorAll(".abtn");

    // 1-2. 변경 대상: .slide
    const slide = obj.querySelector(".slide");

    // 1-3. 블릿 대상: .indic li
    // console.log(indic);

    // 1-4. 슬라이드 li리스트
    let slist = obj.querySelectorAll(".slide>li");

    // 🌈드래그 함수 호출🌈
    // dragFn(slide);

    // [ 초기화1 - 순번붙이기 ] ///////////////////
    // 잘라내기로 li순번이 뒤섞이므로 블릿변경 매칭을 위한
    // 고유순번을 사용자정의 속성(data-)으로 만들어준다!
    slist.forEach((ele, idx) => {
        // data-seq 라는 사용자정의 속성 넣기
        ele.setAttribute("data-seq", idx);
    }); ////// forEach /////////////////

    // [ 초기화2 - 맨뒤요소 맨앞으로 이동 2번하기! ]
    // 맨뒤 맨앞이동 함수만들기
    const chgSeq = () => {
        // 현재 슬라이드 li 새로읽기(2번반복시 li의 순서가 달라지기때문)
        slist = obj.querySelectorAll(".slide>li");
        // 맨뒤 맨앞이동하기 -> 변경대상: .slide -> slide변수
        slide.insertBefore(slist[slist.length - 1], slist[0]);
        // slide.insertBefore(넣을놈,넣을놈전놈)
        // slide.insertBefore(마지막요소,첫요소)
        // slide.insertBefore(slist[개수-1],slist[0]);
    }; ////////// chgSeq함수 ///////////

    // 2번 맨뒤 맨앞이동 함수 호출하기!!!
    for (let i = 0; i < 2; i++) chgSeq();

    // 광클금지변수 : 0 - 허용, 1 - 불허용
    let prot = 0;

    // 2. 슬라이드 변경함수 만들기
    // 호출시 seq에 들어오는 값중 1은 오른쪽, 0은 왼쪽
    const goSlide = (seq) => {
        //  console.log("슬고우!", seq);

        //  console.log("못들어갔어!!!!");

        // 광클금지 설정하기 //////
        if (prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 해제!
        }, 800); /// 0.4초후 해제! ///

        //  console.log("나,들어왔어!!!");

        // 0. 현재의 슬라이드 li수집하기
        let clist = slide.querySelectorAll("li");
        // clist -> current list 현재 리스트

        // 1. 방향에 따른 분기
        // 1-1. 오른쪽버튼 클릭시 ////////////////
        if (seq) {
            console.log("오른!");

            // 1. 슬라이드 이동전 먼저 잘라낸다!
            // 이유: 슬라이드 순서를 왼쪽이동과 동일하게 함!
            // 중앙확대 트랜지션 적용시 동작이 달라지므로!

            // (1-1) 바깥에 나가있는 첫번째 슬라이드
            //       li를 잘라서 맨뒤로 보낸다!
            slide.appendChild(clist[0]);
            // (1-2) 동시에 left값을 -110%으로 변경한다!
            slide.style.left = "-110%";
            // (1-3) 트랜지션 없애기!
            slide.style.transition = "none";

            // (2) 오른쪽 버튼 클릭시 다음 슬라이드가
            //     나타나도록 슬라이드 박스의 left값을
            //     -220%로 변경시킨다.

            // [코드분리하기!] //////////////////////////
            // -> 같은속성변경을 같은 메모리공간에서 수행하면
            // 변경효과가 없음!!!
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .8s ease-in-out";
            }, 1); //// 타임아웃 //////
            // 시간에 0을쓰면 인터발호출시 트랜지션이 안먹히는 에러가 있음
            // 1만써도 괜찮음~

            // -> 타이밍함수는 기존 함수인 스택(Stack)메모리 공간이 아닌
            // 대기실행 공간인 큐(Queue)메모리공간에서 실행하므로
            // 코드가 동시에 바뀌는 것을 막아주고 의도한 대로
            // 시차실행을 가능하게 해준다!
        } //////////// if : 오른쪽클릭시 //////

        // 1-2. 왼쪽버튼 클릭시 //////////////
        else {
            console.log("왼쪽!");

            // (1) 왼쪽버튼 클릭시 이전 슬라이드가
            // 나타나도록 하기위해 우선 맨뒤 li를
            // 맨앞으로 이동한다.
            // slide.insertBefore(넣을놈,넣을놈전놈)
            // slide.insertBefore(맨끝li,맨앞li)
            slide.insertBefore(clist[clist.length - 1], clist[0]);

            // (2) 동시에 left값을 -330%로 변경한다.
            slide.style.left = "-330%";
            // 이때 트랜지션을 없앤다(한번실행후 부터 생기므로!)
            slide.style.transition = "none";

            // (3) 그 후 left값을 -220%으로 애니메이션하여
            // 슬라이드가 왼쪽에서 들어온다.
            // 동일 속성인 left가 같은 코딩처리 공간에 동시에
            // 있으므로 이것을 분리해야 효과가 있다!
            // setTimeout을 사용한다!
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .8s ease-in-out";
            }, 0); ////// 타임아웃 /////////
        } //////////// else : 왼쪽클릭시 //////

        // 2. 현재 슬라이드 순번과 같은 블릿표시하기
        // 대상: . li -> indic변수
        const indic = document.querySelectorAll(".programLnb .indic a");
        // 2-1. 현재 배너리스트 업데이트하기
        clist = slide.querySelectorAll("li");
        // !!!!! 오른쪽이든 왼쪽이든 먼저 잘라내기 때문에
        // 순번은 3번째로 일치함!!!!!!
        // console.log("다시수집:",clist);

        // 2-2.방향별 읽어올 슬라이드 순번으로 "data-seq"값 읽어오기
        // 세번째 슬라이드가 주인공이니까 0,1,2 즉 2번을 쓰면됨!!!
        let cseq = clist[2].getAttribute("data-seq");
        // console.log("현재순번:", cseq);

        // 2-3. 블릿초기화
        for (let x of indic) x.classList.remove("on");

        // 2-4. 읽어온 슬라이드 순번의 블릿에 클래스 "on"넣기
        indic[cseq].classList.add("on");
    }; ////////// goSlide함수 ///////////

    // 3. 이동버튼대상에 이벤트 설정하기
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 0. 기본이동막기
            event.preventDefault();
            // 1. 인터발지우기함수 호출!
            // clearAuto();
            // 2. 슬라이드 함수 호출!
            goSlide(idx);
        }; ///// click함수 //////
    }); /////// forEach //////////

    ////////////////////////////
    // 자동넘김 설정하기 ////////

    // 일정시간간격 넘어가기
    // -> setInterval(함수,시간)

    // [인터발함수의 함수전달값 사용예
    // (타임아웃함수도 동일함)]
    // 1. 함수에 전달값이 없으면 함수명만 사용가능
    // setInterval(goSlide,3000);
    // 2. 전달값이 있다면 익명함수구역에 코딩
    // setInterval(function(){goSlide(1)},3000);
    // 3. 화살표함수사용가능
    // setInterval(()=>{goSlide(1)},3000);
    // 4. 화살표함수에서 중괄호 생략가능
    // setInterval(()=>goSlide(1),3000);

    // 인터발함수 지우기위한 변수
    let autoI;
    // 타임아웃함수 지우기위한 변수
    let autoT;

    /************************************ 
        함수명: autoSlide
        기능: 인터발함수로 슬라이드함수 호출
    ************************************/
    function autoSlide() {
        console.log("인터발시작!");
        // 인터발함수로 슬라이드함수 호출하기
        autoI = setInterval(() => goSlide(1), 3000);
    } ////////////// autoSlide함수 //////////

    // 자동넘김 최초호출!
    // autoSlide();

    /************************************ 
        함수명: clearAuto
        기능: 인터발함수를 지우고 다시셋팅
   ************************************/
    function clearAuto() {
        console.log("인터발멈춤!");
        // 1. 인터발 지우기
        clearInterval(autoI);

        // 2. 타임아웃도 지우지 않으면
        // 쌓여서 타임아웃 쓰나미실행이 발생한다!
        clearTimeout(autoT);

        // 3. 잠시후 다시 작동하도록 타임아웃으로
        // 인터발함수를 호출한다!
        // 5초후(인터발은 3초후, 토탈 8초후 작동시작)
        autoT = setTimeout(autoSlide, 5000);
    } ///////// clearAuto 함수 /////////////

    
} //////////////// setBan 함수 끝 ///////////////

// 🌈🌈🌈🌈🌈data-seq와 indic의 idx와 동일하니까 그걸로 연결시키면 되지 않을까?🌈🌈🌈🌈🌈🌈🌈
function setIndicLinkFn(obj){
    const slide = obj.querySelector(".slide");
    const indic = document.querySelectorAll(".programLnb .indic a");
    let iseq = 0;
    // console.log(indic);

    // console.log(clist);
    
    indic.forEach((ele, idx)=>{
        
        ele.addEventListener("click", ()=>{
            let clist = slide.querySelectorAll("li");

            // 1.클릭된 순번
            let click_seq = idx;
            // 2.현재 순번 - iseq
            // 3.순번차이 : 클릭된 순번 - 현재 순번
            let diff = click_seq - iseq;
            // 절대값으로 만들기
            let pure = Math.abs(diff);

            console.log("클릭된순번: ", click_seq);
            console.log("현재순번", iseq);
            console.log("순번차: ", diff);
            console.log("순수한 차이값: ", pure);


            slide.appendChild(clist[0]);
            slide.style.left = "-110%";
            // slide.style.left = (-110 * diff)+"%";
            slide.style.transition = "none";
            
            setTimeout(() => {
                slide.style.left = "-220%";
                // slide.style.left = (-220 * diff)+"%";
                slide.style.transition = "left .8s ease-in-out";
            }, 1); //// 타임아웃 //////

        }); ////////////////// click ///////////////////////

    }); ////////////////// forEach ///////////////////////
} /////////////////////////////// setIndicLinkFn 함수 끝 ////////////////////////////////


/***************************************************
    [ 불릿 클릭 이동 구현하기 ]
1.오른쪽 이동시 : 현재 불릿보다 오른쪽 클릭시
    1)기본형 : 오른쪽 버튼 클릭 구현
    2)유형 : 먼저 이동 후 맨 앞요소 맨뒤로 보내기
    3)원리 : 차이수만큼 %이동 후 for문으로 잘라서 순서대로 맨뒤로 이동

2.왼쪽 이동시 : 현재 불릿보다 왼쪽 클릭시
    1)기본형 : 왼쪽 버튼 클릭기능 구현
    2)유형 : 먼저 맨 뒤에 있는 요소를 맨앞으로 이동 후 들어오기
    3)원리 : 차이수만큼 앞에 for문으로 쌓은 후, 이동하기

3.방향구분의 기준 : 클릭된 불릿 순번 - 현재 불릿 순번
    1)양수가 나올 경우 : 오른쪽으로 이동
    2)음수가 나올 경우 : 왼쪽으로 이동

***************************************************/

// 대상 : .indic li -> indic변수
// 이벤트 : 클릭 이벤트
// 순번을 담을 변수 만들기 : 처음엔 무조건 맨 처음슬라이드가 보이니까, 맨 처음 슬라이드의 인덱스번호는 0임
// 클래스리스트.컨테인스"on"으로 무조건 찾을 필요 없음1 요기서는 맨처음에 온이 들어간 li가 뭔지 아니까
// =>> 함수 바깥에 변수를 만든 이유 : 공용으로... 함수내에서 바뀌는 그런 내용들이 바로바로 업데이트돼서 적용되는거..확인용..??


function indicClickFn(obj) {
    const indic = document.querySelectorAll(".programLnb .indic a");
    const slide = obj.querySelector(".slide");
    // console.log(indic);

    indic.forEach((ele, idx)=>{
        ele.addEventListener("click", ()=>{
            // 1.클릭된 순번
            let click_seq = idx;
            // 2.현재 순번 - iseq
            // 3.순번차이 : 클릭된 순번 - 현재 순번
            let diff = click_seq - iseq;
            // 절대값으로 만들기
            let pure = Math.abs(diff);

            console.log("클릭된순번: ", click_seq);
            console.log("현재순번", iseq);
            console.log("순번차: ", diff);
            console.log("순수한 차이값: ", pure);

            // 4.방향별 슬라이드 이동하기
            // 4-1.양수 = 오른쪽 이동 ///////////////////
            if(diff > 0){
                // (1) 오른쪽 버튼 클릭시 다음 슬라이드가 나타나도록 슬라이드 박스의 left값을 (-100% * 절대값)으로 변경하기
                slide.style.left = -100 * pure + "%";
                slide.style.transition = "left .8s ease-in-out";

                // (2) 슬라이드 이동 후 (=0.8초 후) 작동할 타임아웃
                setTimeout(() => {
                    // for문으로 자를 수(절대값)만큼 순서대로 처리하기
                    // 계산되는 차이수 : 1씩 감소하여 left값에 계산 시키면 됨
                    let temp = pure;

                    for(let i = 0; i < pure; i++){
                        temp--;

                        // (2-1) 바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨 뒤로 보내기
                        slide.appendChild(slide.querySelectorAll("li")[0]);
                        // (2-2) 동시에 left값을 0으로 변경해서 잘라낸거 끝에다가 붙이기
                        slide.style.left = -100 * temp + "%";
                        // (2-3) 트랜지션 없애기
                        slide.style.transition = "none";
                    } //////////////////// for문 //////////////////////
                }, 800); //////////////// setTimeout ///////////////////
            } /////////////////////// if : 오른쪽 이동하는 경우 ///////////////////////////
            
            // 4-2. 음수면 왼쪽으로 이동하기
            else if (diff < 0) {
                // (1) 왼쪽버튼 클릭시 이전 슬라이드가 나타나도록 하기 위해 우선 맨뒤의 li를 맨 앞으로 이동시키기
                
                for(let i = 0; i < pure; i++){
                    // 이동할 리스트 변수
                    let clist = slide.querySelectorAll("li");

                    // (2) 동시에 left값을 -100%로 변경하기 (i값이 0부터 반복횟수만큼 증가하므로 이걸 이용함)
                    slide.style.left = ((i+1) * -100) + "%";

                    slide.insertBefore(clist[clist.length - 1], clist[0]);
                } ///////////////// for문 ///////////////////

                slide.style.transition = "none";

                // (3) 그 후 left값을 0으로 애니메이션하여 슬라이드가 왼쪽에서 들어오게 만듦
                // ->> 시간차 주고 분리하기
                setTimeout(() => {
                    slide.style.left = "0";
                    slide.style.transition = "left .8s ease-in-out";
                }, 1); ///////////////// setTimeout //////////////////////////////
            } ///////////////////// else if : 왼쪽으로 이동하는 경우 ////////////////////////////
            // 4-3. 0이면 나가게 만들기
            else{return;}

            // 5. 현재 변경 불릿 초기화하기
            indic[iseq].classList.remove("on");

            // 6. 클릭된 순번으로 현재 순번을 변경하기
            iseq = click_seq;

            // 7. 클릭된 불릿에 on넣기
            indic[iseq].classList.add("on");


        }); //////////////////// click ///////////////////////
    }); //////////////// forEach ////////////////////
} /////////////////////////////// indicClickFn 함수 끝 ///////////////////////////////











/*****************************************
    함수명 : dragFn
    기능 : 다중 드래그 기능 적용
*****************************************/
function dragFn(obj) {
    console.log("드래그!");

    // 드래그 상태 변수 - true:드래그 중 / false:드래그 안함
    let drag = false;
    // 첫번째 위치 포인트 : first x, first y
    let firstX, firstY;
    // 마지막 위치 포인트 : last x, last y -> 맨 처음에는 마지막 위치 포인트가 없으므로 0이라 해줘야 함

    // 슬라이드의 처음 left값 세팅하기
    let leftX = obj.offsetLeft;
    let leftY = 0;

    // 움직일 때 위치 포인트 move x, move y
    let moveX, moveY;
    // 위치 이동한 차이값을 저장할 변수 result x, result y
    let resultX, resultY;

    // 함수 만들기
    // (1)드래그 상태가 true인 변수
    const dragT = () => {
        drag = true;
    };
    // (2)드래그 상태가 false인 변수
    const dragF = () => {
        drag = false;
    };
    // (3)드래그 작동할 때의 작동 함수
    const dragMove = () => {
    // console.log("드래그 상태", drag);

    // 드래그 상태일때만 실행하기
    if (drag) {
        console.log("왜안돼ㅠ");
        // 트랜지션 없애기
        obj.style.transition = "none";

        // 1.드래그한 상태에서 움직일 때의 위치값 : moveX,Y
        moveX = event.pageX;
        moveY = event.pageY;

        // 2.움직일 때의 위치값 - 처음위치값 = resultX,Y에 담기
        resultX = moveX - firstX;
        resultY = moveY - firstY;

        // 3.움직인 x,y값을 타겟 요소에 적용하기
        obj.style.left = resultX + leftX + "px";
    } //////////////////// if : 드래그 /////////////////////////
    };
    // (4)첫번째 위치 포인트 세팅하는 함수 : 처음 찍었을 때 작동하는 것
    const firstPoint = () => {
        firstX = event.pageX;
        firstY = event.pageY;
    };
    // (5)마지막 위치 포인트 세팅하는 함수 : 클릭버튼에서 손 뗄 때 작동하는 것!
    const lastPoint = () => {
        leftX += resultX;
        leftY += resultY;
    };
    // 최종 이동 결과값인 resultX,Y값을 항상 대입연산해서 값을 업데이트 해줘야함!!!!

    // 이벤트 등록하기
    // 1.마우스 내려갈때 : 드래그 true + 첫번쨰 위치값 업데이트하기
    obj.addEventListener("mousedown", () => {
        // 드래그 true
        dragT();
        // 첫번째 위치값 업데이트
        firstPoint();

        // event.preventDefault();
    });
    // 2.마우스 올라올 때 : 드래그 false + 마지막 위치값 업데이트하기
    obj.addEventListener("mouseup", () => {
        // 드래그 false
        dragF();

        // 드래그 이동방향 판별하는 함수 호출하기
        whereDrag(obj);
    });

    // 3.마우스 움직일 때
    obj.addEventListener("mousemove", dragMove);
    // 4.마우스 벗어날 때
    obj.addEventListener("mouseleave", dragF);


    // 화면 크기 변경할 경우 발생하는 resize 이벤트!
    // 필요한 경우, 이 코드 실행하기
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
    // 1.현재 드래그 대상의 left 위치값
    let tg_left = obj.offsetLeft;

    // 유동적 사이즈 변경에 따른 위치값 구하기
    let tg_point = obj.parentElement.clientHeight * 2.2;

    // 3.방향 판별하기 : 특정값을 더하거나 빼기
    // 3-1.왼쪽 방향으로 이동하기 = 오른쪽 버튼 클릭 기능과 동일함
    if (tg_left < tg_point - 50) {
        console.log("왼쪽으로!");
        dragFn(1);
    }
    // 3-2.오른쪽 방향 이동하기 = 왼쪽 버튼 클릭 기능과 동일함
    else if (tg_left > tg_point + 50) {
        console.log("오른쪽으로!");
        dragFn(0);
    } else {
        console.log("제자리로!");

        // 기준값 left로 다시 보내기
        obj.style.left = -tg_point + "px";

        // 트랜지션을 줘서 부드럽게 움직이게 만들기
        obj.style.transition = "left .2s ease-in-out";
    }
} ////////////////////////////// whereDrag 함수 끝 ///////////////////////////

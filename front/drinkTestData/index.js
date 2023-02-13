export const qnaList = [
  {
    number: "01",
    question: "음식을 말하면 매칭되는 술이 바로 떠오른다?",
    choices: [
      {
        text: (
          <>
            치킨엔 맥주, 회에는 소주, 나초에 위스키
            <br />
            음식을 보면 바로 술이 떠오르는게 정상이지
          </>
        ),
        value: "drink",
      },
      {
        text: (
          <>
            음식에 집중해야지 무슨 술이야
            <br />
            물만 있어도 음식을 먹는데 전혀 지장이 없다
          </>
        ),
        value: "noDrink",
      },
    ],
  },
  {
    number: "02",
    question: "집에 있는 토요일 오후, 비오는 것을 보고 드는 생각은?",
    choices: [
      {
        text: (
          <>
            (친구에게 전화하며)
            <br />
            파전 막걸리 고?
          </>
        ),
        value: "drink",
      },
      { text: <>침대에 누워서 유튜부를 시청한다</>, value: "noDrink" },
    ],
  },
  {
    number: "03",
    question: "퇴사를 한 친구를 위로해줄 때 볼 장소는?",
    choices: [
      {
        text: (
          <>
            한 잔 하자,
            <br />술 마시면서 이야기하자고!
          </>
        ),
        value: "drink",
      },
      { text: <>커피마시면서 이야기하는 거 어때?</>, value: "noDrink" },
    ],
  },
  {
    number: "04",
    question: "오늘은 월급날. 마음에 드는 옷과 30% 할인중인 위스키가 있다면?",
    choices: [
      {
        text: (
          <>
            이건 못참지.
            <br />
            위스키 풀매수 가자잇!
          </>
        ),
        value: "drink",
      },
      { text: <>백화점에 가서 옷 쇼핑이 딱이지</>, value: "noDrink" },
    ],
  },
  {
    number: "05",
    question: "이직 후 첫 출근날. 회식 장소를 선택할 수 있다면?",
    choices: [
      {
        text: (
          <>
            대표님 카드 터는 날이다.
            <br />
            비싼 소고기집에 가서 간단하게 소주 고!
          </>
        ),
        value: "drink",
      },
      {
        text: (
          <>
            #첫출근 #OO동맛집.
            <br />
            갬성 음식점에서 음식과 에이드 먹어요~
          </>
        ),
        value: "noDrink",
      },
    ],
  },
  {
    number: "06",
    question: "힘겨운 일이 끝나고 가장 먹고싶은 것은?",
    choices: [
      { text: <>치킨에 맥주가 그렇게 생각나더라</>, value: "drink" },
      { text: <>달달한 과일이 땡겨</>, value: "noDrink" },
    ],
  },
  {
    number: "07",
    question: "현재 더 끌리는 것은?",
    choices: [
      {
        text: <>술 한 잔</>,
        value: "drink",
      },
      {
        text: <>음료 한 잔</>,
        value: "noDrink",
      },
    ],
  },
];

export const qnaResult = [
  {
    title: "술이 나를 부른다. 알콜 러버",
    character: "image src",
    results: (
      <>
        술을 좋아하는 당신.
        <br />
        술을 마시고 많은 추억을 쌓는 것도 좋지만
        <br />
        과한 음주는 몸에 좋지 않다는 점 알고있죠?
        <br />
        <br />
        폭음은 줄이고 운동을 병행한다면
        <br />더 즐거운 음주 라이프를 즐길 수 있을거에요
      </>
    ),
    recommendFood: [
      {
        src: "https://cdn-std-web-144-223.cdn-nhncommerce.com/lifestory1_godomall_com/data/goods/21/07/27/1000000003/1000000003_add3_079.jpg",
        name: "숙취해소제",
      },
      {
        src: "http://healnyou.com/web/product/big/201610/61_shop1_254418.jpg",
        name: "밀크시슬",
      },
    ],
  },
  {
    title: "술보단 다른 게 좋아",
    character: "image src",
    results: (
      <>
        술로 피로해지지 않은 간으로
        <br />
        더 많은 활동이 가능하겠는걸요?
        <br />
        음료를 마시며 사람들과 편안한 추억을 갖는 것도 좋지만
        <br />
        <br />
        술자리에서만 있는 일이 있기에 가끔은 술자리에 참여해
        <br />
        취한 사람들을 보며 재밌는 기억을 갖는 것도 좋아요!
      </>
    ),

    recommendFood: [
      {
        src: "https://sitem.ssgcdn.com/30/84/04/item/1000398048430_i1_500.jpg",
        name: "하이볼",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0606/0634/9563/products/D_NQ_NP_686135-MLA42165140694_062020-O.jpg?v=1635357512",
        name: "화이트와인",
      },
    ],
  },
];

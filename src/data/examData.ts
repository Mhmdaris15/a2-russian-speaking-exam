// ── Types ────────────────────────────────────────────

export interface Topic {
  id: number;
  titleRu: string;
  titleEn: string;
  textRu: string;
  textEn: string;
}

export interface FollowUpSet {
  topicId: number;
  topicTitleRu: string;
  contextNote: string;
  questions: { questionRu: string; answerRu: string }[];
}

export interface SituationCategory {
  category: string;
  situations: { scenarioRu: string; answerRu: string }[];
}

export interface Flashcard {
  id: string;
  frontRu: string;
  backEn: string;
  category: 'topic' | 'question' | 'situation';
}

// ── Topics ───────────────────────────────────────────

export const topics: Topic[] = [
  {
    id: 1,
    titleRu: 'Биография: детство, учёба, интересы, семья',
    titleEn: 'Biography: Childhood, Education, Interests, Family',
    textRu: 'Меня зовут Арис, мне 21 год. Я родился в Индонезии, в городе Богор. У меня есть папа, мама и младший брат. Сейчас я живу в России и активно изучаю русский язык. Раньше я два года учил немецкий язык, но сейчас я много забыл. В свободное время я люблю изучать новые технологии и проводить эксперименты, чтобы создавать приложения или системы. Также я играю на гитаре и готовлю еду.',
    textEn: 'My name is Aris, and I\'m 21 years old. I was born in Bogor, Indonesia. I have a dad, a mom, and a younger brother. I currently live in Russia and am actively learning Russian. I used to study German for two years, but I\'ve forgotten a lot of it now. In my free time, I enjoy learning about new technologies and conducting experiments to create apps or systems. I also play the guitar and cook.',
  },
  {
    id: 2,
    titleRu: 'Моя профессия: учёба, выбор места учёбы и профессии',
    titleEn: 'My Career: Education, Choosing a Place to Study and a Career',
    textRu: 'Я — программист с многолетним опытом работы. Сейчас я учусь на подготовительном факультете в ИТМО. Я ищу работу здесь, в России, потому что хочу развивать свои навыки и не терять опыт. В будущем я хочу изучать нейротехнологии. Моя цель — создавать инновационные ИТ-проекты и работать с искусственным интеллектом.',
    textEn: 'I am a programmer with many years of experience. I am currently studying at the preparatory faculty at ITMO. I am looking for a job here in Russia because I want to develop my skills and keep my experience sharp. In the future, I want to study neurotechnology. My goal is to create innovative IT projects and work with artificial intelligence.',
  },
  {
    id: 3,
    titleRu: 'Образ жизни: ежедневные занятия, отдых, общение',
    titleEn: 'Lifestyle: Daily Activities, Leisure, Socializing',
    textRu: 'В будние дни я хожу на занятия в университет. Раньше я работал программистом после учёбы, чтобы зарабатывать деньги, но сейчас я фокусируюсь на своих навыках и участвую в разных ИТ-конкурсах в России. По вечерам я обычно общаюсь с соседями в общежитии. В выходные я люблю посещать ИТ-мероприятия в кампусе или в городе, чтобы знакомиться с людьми и находить новые возможности. Кстати, Арина — это просто моя подруга, раньше она мне очень нравилась, но сейчас мы просто друзья.',
    textEn: 'On weekdays, I attend classes at the university. I used to work as a programmer after classes to earn money, but now I\'m focusing on my skills and participating in various IT competitions in Russia. In the evenings, I usually hang out with my dorm neighbors. On weekends, I like to attend IT events on campus or in the city to meet people and discover new opportunities. By the way, Arina is just a friend of mine; I used to have a crush on her, but now we\'re just friends.',
  },
  {
    id: 4,
    titleRu: 'Город: Ваш родной город и Санкт-Петербург',
    titleEn: 'City: My Hometown and St. Petersburg',
    textRu: 'Мой родной город Богор находится рядом с Джакартой. В Богоре часто идёт дождь, а вокруг города есть горы, поэтому там прохладнее, чем в других городах Индонезии. Санкт-Петербург — очень эстетичный город с потрясающей архитектурой. Главный минус — здесь очень холодно, мне это не нравится. Но сейчас стало тепло, и я люблю гулять по городу. Люди здесь добрые и открытые. Иногда я хожу в разговорный клуб, чтобы общаться с иностранцами и русскими. Это помогает мне не чувствовать себя одиноко.',
    textEn: 'My hometown, Bogor, is located near Jakarta. It rains often in Bogor, and there are mountains surrounding the city, so it\'s cooler there than in other cities in Indonesia. St. Petersburg is a very beautiful city with stunning architecture. The main downside is that it\'s very cold here, and I don\'t like that. But now it\'s gotten warmer, and I love walking around the city. The people here are kind and open. Sometimes I go to a conversation club to chat with foreigners and Russians. It helps me not feel lonely.',
  },
  {
    id: 5,
    titleRu: 'Карта мира: путешествия, поездки, мечты, планы',
    titleEn: 'World Map: Travel, Trips, Dreams, Plans',
    textRu: 'Этим летом я хочу поехать в Калининград. Это очень исторический город, и его архитектура и культура близки к немецким. Это идеальное время для поездки. Мои русские друзья пригласили меня туда, и я с радостью поеду вместе с ними. Также в будущем я хочу увидеть другие города России и продолжать путешествовать.',
    textEn: 'This summer I want to go to Kaliningrad. It\'s a very historic city, and its architecture and culture are similar to Germany\'s. It\'s the perfect time to visit. My Russian friends invited me there, and I\'ll happily go with them. I also want to see other cities in Russia in the future and keep traveling.',
  },
];

// ── Follow-up Questions ──────────────────────────────

export const followUpSets: FollowUpSet[] = [
  {
    topicId: 1, topicTitleRu: 'Биография', contextNote: 'Экзаменатор может спросить больше о вашей семье или хобби.',
    questions: [
      { questionRu: 'Кем хочет стать ваш младший брат?', answerRu: 'Мой брат Арди ещё учится, ему девятнадцать лет. Он очень любит играть на гитаре, как и я.' },
      { questionRu: 'Какую музыку вы играете на гитаре?', answerRu: 'Я учусь играть популярные песни и классическую музыку. Иногда я играю советские или российские песни, чтобы учить язык.' },
      { questionRu: 'Вы часто готовите индонезийскую еду в России?', answerRu: 'Да, я часто готовлю индонезийское блюдо Аям Унгкеп (курицу) в общежитии.' },
    ],
  },
  {
    topicId: 2, topicTitleRu: 'Моя профессия', contextNote: 'Вопросы могут касаться вашей работы программистом или учёбы в ИТМО.',
    questions: [
      { questionRu: 'Почему вы решили стать программистом?', answerRu: 'Мне всегда нравились технологии. Я хочу создавать полезные программы и работать с искусственным интеллектом.' },
      { questionRu: 'Трудно ли учиться в ИТМО?', answerRu: 'Да, это сложный университет, но очень интересный. Сейчас я учу русский язык, чтобы потом изучать нейротехнологии.' },
      { questionRu: 'Где вы работали раньше?', answerRu: 'Я работал в компании Demandlane три года как независимый подрядчик.' },
    ],
  },
  {
    topicId: 3, topicTitleRu: 'Образ жизни', contextNote: 'Экзаменатор может спросить о вашем распорядке дня или общении.',
    questions: [
      { questionRu: 'Где вы обычно гуляете с вашей девушкой?', answerRu: 'Мы часто ходим в Эрмитаж или гуляем в парках Санкт-Петербурга.' },
      { questionRu: 'Какие ещё продукты вы покупаете для диеты?', answerRu: 'Я покупаю много курицы, макароны и ингредиенты для блинов. Мне нужен белок для тренировок.' },
      { questionRu: 'У вас много друзей в Санкт-Петербурге?', answerRu: 'У меня есть друзья в университете и в организации Permira. Мы часто учимся вместе.' },
    ],
  },
  {
    topicId: 4, topicTitleRu: 'Город', contextNote: 'Вас могут спросить о погоде или о том, чего вам не хватает.',
    questions: [
      { questionRu: 'Что вам больше всего нравится в Санкт-Петербурге?', answerRu: 'Мне нравится архитектура и то, что здесь много красивых кафе, где можно работать с ноутбуком.' },
      { questionRu: 'Вам не холодно в России зимой?', answerRu: 'В Индонезии всегда тепло, а в России зимой очень холодно, но в Петербурге красиво, когда идёт снег.' },
      { questionRu: 'Где именно вы живёте в Петербурге?', answerRu: 'Я живу в новом здании на Вяземском переулке, это общежитие ИТМО.' },
    ],
  },
  {
    topicId: 5, topicTitleRu: 'Карта мира', contextNote: 'Вопросы о ваших прошлых поездках или будущих мечтах.',
    questions: [
      { questionRu: 'Вы когда-нибудь ходили в походы в России?', answerRu: 'Да, я был в походе в Линдуловской роще. Мне очень нравится русская природа.' },
      { questionRu: 'Почему вы хотите поехать именно в Карелию?', answerRu: 'Я люблю лес и кемпинг. Я хочу увидеть красивые озёра и отдохнуть от города.' },
      { questionRu: 'На каком языке вы общаетесь, когда путешествуете?', answerRu: 'Обычно на английском, но в России я стараюсь говорить по-русски, чтобы практиковаться.' },
    ],
  },
];

// ── All follow-up questions flat ─────────────────────

export const allFollowUpQuestions = followUpSets.flatMap((s) =>
  s.questions.map((q, i) => ({ id: `q-${s.topicId}-${i}`, topicId: s.topicId, topicTitleRu: s.topicTitleRu, ...q }))
);

// ── Situations ───────────────────────────────────────

export const situationCategories: SituationCategory[] = [
  {
    category: 'Здоровье и советы',
    situations: [
      { scenarioRu: 'У вашего одногруппника болит живот. Посоветуйте ему, что делать.', answerRu: 'Тебе нужно выпить таблетку или пойти в поликлинику к врачу.' },
      { scenarioRu: 'Я хочу поехать летом в ваш город. Посоветуйте, какие вещи нужно взять.', answerRu: 'Я из Индонезии, из города Богор. Летом там очень жарко. Возьмите лёгкую одежду, шорты, футболки и солнцезащитные очки.' },
      { scenarioRu: 'Ваш друг на каникулах хочет поехать в другой русский город. Посоветуйте ему, куда можно поехать.', answerRu: 'Советую поехать в Москву. Это очень красивый город, там много интересных музеев и парков.' },
      { scenarioRu: 'Ваш друг хочет изучать русский язык. Посоветуйте ему, как это лучше сделать.', answerRu: 'Я советую тебе поступить на подготовительный факультет в ИТМО или смотреть видео на YouTube, как это делаю я.' },
      { scenarioRu: 'Ваш друг не сдал экзамен. Посоветуйте ему, как подготовиться к пересдаче.', answerRu: 'Не волнуйся! Тебе нужно больше заниматься, читать учебник и делать домашнее задание каждый день.' },
    ],
  },
  {
    category: 'Путешествия, билеты и транспорт',
    situations: [
      { scenarioRu: 'Вы хотите поехать куда-нибудь летом. Вы пришли в туристическое агентство.', answerRu: 'Здравствуйте! Я хочу поехать в Карелию на неделю, потому что я люблю природу. Мне нужен хороший номер и билеты на поезд.' },
      { scenarioRu: 'Купите в кассе билет на поезд в Москву.', answerRu: 'Здравствуйте! Дайте, пожалуйста, один билет на поезд в Москву на завтра, на утро.' },
      { scenarioRu: 'Купите в кассе билет на самолет в Москву.', answerRu: 'Здравствуйте! Мне нужен один билет на самолёт до Москвы на пятницу.' },
      { scenarioRu: 'Объясните другому студенту, как доехать до университета из общежития.', answerRu: 'Я живу на Вяземском. Тебе нужно сесть на метро на станции «Петроградская» и ехать до станции «Владимирская». Это недалеко.' },
    ],
  },
  {
    category: 'Кафе, рестораны и приглашения',
    situations: [
      { scenarioRu: 'Позвоните в кафе и закажите еду домой.', answerRu: 'Алло, здравствуйте! Я хочу заказать пиццу на дом. Мой адрес: Вяземский переулок, общежитие.' },
      { scenarioRu: 'Вы хотите пригласить друзей в ресторан на день рождения. Позвоните в ресторан и закажите столик.', answerRu: 'Здравствуйте! Я хочу заказать столик на четырёх человек на вечер субботы. У меня будет день рождения.' },
      { scenarioRu: 'Ваш друг приглашает вас на концерт. Согласитесь.', answerRu: 'Спасибо за приглашение! Я с удовольствием пойду. Я очень люблю слушать классическую музыку.' },
      { scenarioRu: 'Ваш друг приглашает вас в бар. Откажитесь.', answerRu: 'Извини, я не могу. Я не пью пиво, и сегодня вечером я иду в спортзал на тренировку.' },
      { scenarioRu: 'Договоритесь с другом о встрече.', answerRu: 'Привет! Давай встретимся в субботу вечером? Пойдём в парк или в кафе.' },
      { scenarioRu: 'Пригласите друзей в гости.', answerRu: 'Привет! Приходи ко мне в гости в субботу. Я приготовлю вкусный узбекский плов или индонезийский ужин.' },
      { scenarioRu: 'Пригласите друзей на вечеринку.', answerRu: 'Привет! В пятницу вечером у меня будет вечеринка в общежитии. Приходи, будем слушать музыку и отдыхать!' },
    ],
  },
  {
    category: 'Университет и общежитие',
    situations: [
      { scenarioRu: 'Объясните преподавателю, почему вас не было на уроке.', answerRu: 'Извините, пожалуйста, меня не было на уроке, потому что я плохо себя чувствовал. У меня болела голова.' },
      { scenarioRu: 'Объясните преподавателю, почему вы не сделали домашнее задание.', answerRu: 'Извините, я не сделал домашнее задание, потому что я работал. Я программист, и вчера у меня был очень сложный проект.' },
      { scenarioRu: 'Вы опоздали на урок. Извинитесь и объясните, почему вы опоздали.', answerRu: 'Извините за опоздание, можно войти? Я опоздал, потому что в метро было очень много людей.' },
      { scenarioRu: 'Вас не было на уроке. Позвоните одногруппнику и узнайте, что они изучали.', answerRu: 'Привет! Меня сегодня не было на уроке. Скажи, пожалуйста, что вы изучали и какое у нас домашнее задание?' },
      { scenarioRu: 'Вам не нравится ваша комната в общежитии. Попросите коменданта поменять комнату.', answerRu: 'Здравствуйте! Мне не нравится моя комната, потому что там очень шумно, а мне нужно много учиться. Можно поменять комнату?' },
      { scenarioRu: 'К вам в группу пришел новый студент. Познакомьтесь с ним.', answerRu: 'Привет! Меня зовут Арис, я из Индонезии. А как тебя зовут и откуда ты?' },
      { scenarioRu: 'Вы переехали в новую комнату. Познакомьтесь со студентами, которые живут там.', answerRu: 'Всем привет! Я Арис, я программист. Я буду жить с вами. Я учусь в ИТМО и люблю готовить. Давайте дружить!' },
    ],
  },
  {
    category: 'Бытовые ситуации и поздравления',
    situations: [
      { scenarioRu: 'У вас сломался ноутбук. Вы пришли в сервисный центр. Объясните проблему.', answerRu: 'Здравствуйте! У меня сломался ноутбук, он не включается. Я программист, и он мне очень нужен для работы. Вы можете его починить?' },
      { scenarioRu: 'Ваш друг окончил университет. Поздравьте его.', answerRu: 'Поздравляю тебя с окончанием университета! Желаю найти хорошую работу!' },
      { scenarioRu: 'Ваш друг женился. Поздравьте его.', answerRu: 'Поздравляю с днём свадьбы! Желаю вам счастья, любви и крепкой семьи!' },
      { scenarioRu: 'Ваш друг хочет посмотреть фильм. Посоветуйте ему, какой фильм посмотреть.', answerRu: 'Советую посмотреть сериал «Рагнарёк». Там интересная скандинавская мифология, мне очень понравилось.' },
      { scenarioRu: 'Ваша подруга хочет приготовить вкусное блюдо на день рождения. Посоветуйте ей.', answerRu: 'Советую приготовить китайское мясо или узбекский плов. Это не очень трудно, но очень вкусно!' },
      { scenarioRu: 'Ваш друг окончил школу. Посоветуйте ему хороший университет.', answerRu: 'Я советую поступить в университет ИТМО в Санкт-Петербурге. Там отличные программы по технологиям и программированию.' },
      { scenarioRu: 'Ваш друг хочет подарить девушке подарок. Посоветуйте, что можно подарить.', answerRu: 'Подари ей красивые цветы и хорошие духи. Девушкам это всегда нравится.' },
      { scenarioRu: 'Вы были в гостях у друга и забыли свою тетрадь. Позвоните и объясните.', answerRu: 'Алло, привет! Извини, я забыл у тебя свою тетрадь по русскому языку. Можно я приду и заберу её завтра утром?' },
    ],
  },
];

export const allSituations = situationCategories.flatMap((c) =>
  c.situations.map((s, i) => ({ id: `sit-${c.category.slice(0, 4)}-${i}`, category: c.category, ...s }))
);

// ── Flashcards ───────────────────────────────────────

export const flashcards: Flashcard[] = [
  // Topic key sentences
  { id: 'fc-1', frontRu: 'Я родился в Индонезии, в городе Богор.', backEn: 'I was born in Indonesia, in the city of Bogor.', category: 'topic' },
  { id: 'fc-2', frontRu: 'Сейчас я живу в России и активно изучаю русский язык.', backEn: 'I currently live in Russia and am actively learning Russian.', category: 'topic' },
  { id: 'fc-3', frontRu: 'Раньше я два года учил немецкий язык.', backEn: 'I used to study German for two years.', category: 'topic' },
  { id: 'fc-4', frontRu: 'Я — программист с многолетним опытом работы.', backEn: 'I am a programmer with many years of experience.', category: 'topic' },
  { id: 'fc-5', frontRu: 'Сейчас я учусь на подготовительном факультете в ИТМО.', backEn: 'I am currently studying at the preparatory faculty at ITMO.', category: 'topic' },
  { id: 'fc-6', frontRu: 'Моя цель — создавать инновационные ИТ-проекты.', backEn: 'My goal is to create innovative IT projects.', category: 'topic' },
  { id: 'fc-7', frontRu: 'В будние дни я хожу на занятия в университет.', backEn: 'On weekdays, I attend classes at the university.', category: 'topic' },
  { id: 'fc-8', frontRu: 'Я фокусируюсь на своих навыках и участвую в ИТ-конкурсах.', backEn: 'I\'m focusing on my skills and participating in IT competitions.', category: 'topic' },
  { id: 'fc-9', frontRu: 'Санкт-Петербург — очень эстетичный город с потрясающей архитектурой.', backEn: 'St. Petersburg is a very beautiful city with stunning architecture.', category: 'topic' },
  { id: 'fc-10', frontRu: 'Иногда я хожу в разговорный клуб.', backEn: 'Sometimes I go to a conversation club.', category: 'topic' },
  { id: 'fc-11', frontRu: 'Этим летом я хочу поехать в Калининград.', backEn: 'This summer I want to go to Kaliningrad.', category: 'topic' },
  { id: 'fc-12', frontRu: 'Его архитектура и культура близки к немецким.', backEn: 'Its architecture and culture are similar to Germany\'s.', category: 'topic' },
  // Question answers
  { id: 'fc-13', frontRu: 'Мне всегда нравились технологии.', backEn: 'I always liked technology.', category: 'question' },
  { id: 'fc-14', frontRu: 'Я покупаю много курицы, макароны и ингредиенты для блинов.', backEn: 'I buy a lot of chicken, pasta and ingredients for bliny.', category: 'question' },
  { id: 'fc-15', frontRu: 'Обычно на английском, но в России я стараюсь говорить по-русски.', backEn: 'Usually in English, but in Russia I try to speak Russian.', category: 'question' },
  { id: 'fc-16', frontRu: 'Я живу в новом здании на Вяземском переулке.', backEn: 'I live in a new building on Vyazemsky Lane.', category: 'question' },
  { id: 'fc-17', frontRu: 'Я был в походе в Линдуловской роще.', backEn: 'I went hiking in the Lindulovskaya Grove.', category: 'question' },
  { id: 'fc-18', frontRu: 'Я люблю лес и кемпинг.', backEn: 'I love forests and camping.', category: 'question' },
  // Situation answers
  { id: 'fc-19', frontRu: 'Тебе нужно выпить таблетку или пойти в поликлинику к врачу.', backEn: 'You need to take a pill or go to the clinic to see a doctor.', category: 'situation' },
  { id: 'fc-20', frontRu: 'Дайте, пожалуйста, один билет на поезд в Москву на завтра.', backEn: 'Please give me one train ticket to Moscow for tomorrow.', category: 'situation' },
  { id: 'fc-21', frontRu: 'Я хочу заказать столик на четырёх человек.', backEn: 'I want to book a table for four people.', category: 'situation' },
  { id: 'fc-22', frontRu: 'Извините за опоздание, можно войти?', backEn: 'Sorry for being late, may I come in?', category: 'situation' },
  { id: 'fc-23', frontRu: 'У меня сломался ноутбук, он не включается.', backEn: 'My laptop broke, it won\'t turn on.', category: 'situation' },
  { id: 'fc-24', frontRu: 'Поздравляю тебя с окончанием университета!', backEn: 'Congratulations on graduating from university!', category: 'situation' },
  { id: 'fc-25', frontRu: 'Советую поехать в Москву.', backEn: 'I recommend going to Moscow.', category: 'situation' },
  { id: 'fc-26', frontRu: 'Я хочу заказать пиццу на дом.', backEn: 'I want to order a pizza for delivery.', category: 'situation' },
  { id: 'fc-27', frontRu: 'Не волнуйся! Тебе нужно больше заниматься.', backEn: 'Don\'t worry! You need to study more.', category: 'situation' },
  { id: 'fc-28', frontRu: 'Я с удовольствием пойду.', backEn: 'I will gladly go.', category: 'situation' },
];

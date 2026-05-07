// English translations for follow-up questions, situations, and extra questions
// Keyed by Russian text for easy lookup

export const questionTranslations: Record<string, { qEn: string; aEn: string }> = {
  // Topic 1 - Biography
  'Кем хочет стать ваш младший брат?': { qEn: 'What does your younger brother want to become?', aEn: 'My brother Ardi is still studying, he is nineteen years old. He really loves playing guitar, just like me.' },
  'Какую музыку вы играете на гитаре?': { qEn: 'What music do you play on the guitar?', aEn: 'I\'m learning to play popular songs and classical music. Sometimes I play Soviet or Russian songs to learn the language.' },
  'Вы часто готовите индонезийскую еду в России?': { qEn: 'Do you often cook Indonesian food in Russia?', aEn: 'Yes, I often cook the Indonesian dish Ayam Ungkep (chicken) in the dormitory.' },
  // Topic 2 - Career
  'Почему вы решили стать программистом?': { qEn: 'Why did you decide to become a programmer?', aEn: 'I always liked technology. I want to create useful programs and work with artificial intelligence.' },
  'Трудно ли учиться в ИТМО?': { qEn: 'Is it difficult to study at ITMO?', aEn: 'Yes, it\'s a difficult university, but very interesting. Now I\'m learning Russian so I can later study neurotechnology.' },
  'Где вы работали раньше?': { qEn: 'Where did you work before?', aEn: 'I worked at Demandlane for three years as an independent contractor.' },
  // Topic 3 - Lifestyle
  'Где вы обычно гуляете с вашей девушкой?': { qEn: 'Where do you usually walk with your girlfriend?', aEn: 'We often go to the Hermitage or walk in the parks of St. Petersburg.' },
  'Какие ещё продукты вы покупаете для диеты?': { qEn: 'What other products do you buy for your diet?', aEn: 'I buy a lot of chicken, pasta, and ingredients for bliny. I need protein for my workouts.' },
  'У вас много друзей в Санкт-Петербурге?': { qEn: 'Do you have many friends in St. Petersburg?', aEn: 'I have friends at the university and in the Permira organization. We often study together.' },
  // Topic 4 - City
  'Что вам больше всего нравится в Санкт-Петербурге?': { qEn: 'What do you like most about St. Petersburg?', aEn: 'I like the architecture and the many beautiful cafes where you can work with a laptop.' },
  'Вам не холодно в России зимой?': { qEn: 'Aren\'t you cold in Russia in winter?', aEn: 'In Indonesia it\'s always warm, and in Russia it\'s very cold in winter, but St. Petersburg is beautiful when it snows.' },
  'Где именно вы живёте в Петербурге?': { qEn: 'Where exactly do you live in St. Petersburg?', aEn: 'I live in a new building on Vyazemsky Lane, it\'s an ITMO dormitory.' },
  // Topic 5 - Travel
  'Вы когда-нибудь ходили в походы в России?': { qEn: 'Have you ever gone hiking in Russia?', aEn: 'Yes, I went hiking in the Lindulovskaya Grove. I really love Russian nature.' },
  'Почему вы хотите поехать именно в Карелию?': { qEn: 'Why do you specifically want to go to Karelia?', aEn: 'I love forests and camping. I want to see beautiful lakes and get away from the city.' },
  'На каком языке вы общаетесь, когда путешествуете?': { qEn: 'What language do you communicate in when traveling?', aEn: 'Usually in English, but in Russia I try to speak Russian to practice.' },
};

export const situationTranslations: Record<string, { scenarioEn: string; answerEn: string }> = {
  // Health & Advice
  'У вашего одногруппника болит живот. Посоветуйте ему, что делать.': { scenarioEn: 'Your classmate has a stomachache. Advise them what to do.', answerEn: 'You need to take a pill or go to the clinic to see a doctor.' },
  'Я хочу поехать летом в ваш город. Посоветуйте, какие вещи нужно взять.': { scenarioEn: 'I want to go to your city in the summer. Advise what things to bring.', answerEn: 'I\'m from Indonesia, from the city of Bogor. It\'s very hot there in summer. Bring light clothes, shorts, T-shirts, and sunglasses.' },
  'Ваш друг на каникулах хочет поехать в другой русский город. Посоветуйте ему, куда можно поехать.': { scenarioEn: 'Your friend wants to visit another Russian city on vacation. Advise where to go.', answerEn: 'I recommend going to Moscow. It\'s a very beautiful city with many interesting museums and parks.' },
  'Ваш друг хочет изучать русский язык. Посоветуйте ему, как это лучше сделать.': { scenarioEn: 'Your friend wants to learn Russian. Advise them how to do it best.', answerEn: 'I advise you to enroll at the preparatory faculty at ITMO or watch videos on YouTube, like I do.' },
  'Ваш друг не сдал экзамен. Посоветуйте ему, как подготовиться к пересдаче.': { scenarioEn: 'Your friend failed the exam. Advise how to prepare for a retake.', answerEn: 'Don\'t worry! You need to study more, read the textbook, and do homework every day.' },
  // Travel & Transport
  'Вы хотите поехать куда-нибудь летом. Вы пришли в туристическое агентство.': { scenarioEn: 'You want to go somewhere in summer. You came to a travel agency.', answerEn: 'Hello! I want to go to Karelia for a week because I love nature. I need a good room and train tickets.' },
  'Купите в кассе билет на поезд в Москву.': { scenarioEn: 'Buy a train ticket to Moscow at the ticket office.', answerEn: 'Hello! Please give me one train ticket to Moscow for tomorrow morning.' },
  'Купите в кассе билет на самолет в Москву.': { scenarioEn: 'Buy a plane ticket to Moscow at the ticket office.', answerEn: 'Hello! I need one plane ticket to Moscow for Friday.' },
  'Объясните другому студенту, как доехать до университета из общежития.': { scenarioEn: 'Explain to another student how to get to the university from the dormitory.', answerEn: 'I live on Vyazemsky. You need to take the metro at Petrogradskaya station and ride to Vladimirskaya. It\'s not far.' },
  // Cafes & Invitations
  'Позвоните в кафе и закажите еду домой.': { scenarioEn: 'Call a cafe and order food for delivery.', answerEn: 'Hello! I want to order a pizza for delivery. My address: Vyazemsky Lane, dormitory.' },
  'Вы хотите пригласить друзей в ресторан на день рождения. Позвоните в ресторан и закажите столик.': { scenarioEn: 'You want to invite friends to a restaurant for a birthday. Call and book a table.', answerEn: 'Hello! I want to book a table for four people for Saturday evening. It will be my birthday.' },
  'Ваш друг приглашает вас на концерт. Согласитесь.': { scenarioEn: 'Your friend invites you to a concert. Accept.', answerEn: 'Thank you for the invitation! I\'d love to go. I really enjoy listening to classical music.' },
  'Ваш друг приглашает вас в бар. Откажитесь.': { scenarioEn: 'Your friend invites you to a bar. Decline.', answerEn: 'Sorry, I can\'t. I don\'t drink beer, and tonight I\'m going to the gym for a workout.' },
  'Договоритесь с другом о встрече.': { scenarioEn: 'Arrange a meeting with a friend.', answerEn: 'Hi! Let\'s meet on Saturday evening? Let\'s go to the park or a cafe.' },
  'Пригласите друзей в гости.': { scenarioEn: 'Invite friends to visit.', answerEn: 'Hi! Come to my place on Saturday. I\'ll cook a delicious Uzbek plov or Indonesian dinner.' },
  'Пригласите друзей на вечеринку.': { scenarioEn: 'Invite friends to a party.', answerEn: 'Hi! On Friday evening I\'m having a party in the dorm. Come, we\'ll listen to music and relax!' },
  // University & Dorm
  'Объясните преподавателю, почему вас не было на уроке.': { scenarioEn: 'Explain to the teacher why you missed class.', answerEn: 'I\'m sorry, I wasn\'t in class because I felt unwell. I had a headache.' },
  'Объясните преподавателю, почему вы не сделали домашнее задание.': { scenarioEn: 'Explain to the teacher why you didn\'t do homework.', answerEn: 'Sorry, I didn\'t do the homework because I was working. I\'m a programmer, and yesterday I had a very difficult project.' },
  'Вы опоздали на урок. Извинитесь и объясните, почему вы опоздали.': { scenarioEn: 'You were late to class. Apologize and explain why.', answerEn: 'Sorry for being late, may I come in? I was late because there were too many people in the metro.' },
  'Вас не было на уроке. Позвоните одногруппнику и узнайте, что они изучали.': { scenarioEn: 'You missed class. Call a classmate and find out what they studied.', answerEn: 'Hi! I wasn\'t in class today. Please tell me what you studied and what our homework is.' },
  'Вам не нравится ваша комната в общежитии. Попросите коменданта поменять комнату.': { scenarioEn: 'You don\'t like your dorm room. Ask the warden to change rooms.', answerEn: 'Hello! I don\'t like my room because it\'s very noisy, and I need to study a lot. Can I change rooms?' },
  'К вам в группу пришел новый студент. Познакомьтесь с ним.': { scenarioEn: 'A new student joined your group. Introduce yourself.', answerEn: 'Hi! My name is Aris, I\'m from Indonesia. What\'s your name and where are you from?' },
  'Вы переехали в новую комнату. Познакомьтесь со студентами, которые живут там.': { scenarioEn: 'You moved to a new room. Introduce yourself to the students living there.', answerEn: 'Hi everyone! I\'m Aris, I\'m a programmer. I\'ll be living with you. I study at ITMO and love cooking. Let\'s be friends!' },
  // Everyday & Congratulations
  'У вас сломался ноутбук. Вы пришли в сервисный центр. Объясните проблему.': { scenarioEn: 'Your laptop broke. You came to a service center. Explain the problem.', answerEn: 'Hello! My laptop broke, it won\'t turn on. I\'m a programmer and I really need it for work. Can you fix it?' },
  'Ваш друг окончил университет. Поздравьте его.': { scenarioEn: 'Your friend graduated from university. Congratulate them.', answerEn: 'Congratulations on graduating! I wish you find a good job!' },
  'Ваш друг женился. Поздравьте его.': { scenarioEn: 'Your friend got married. Congratulate them.', answerEn: 'Congratulations on your wedding day! I wish you happiness, love, and a strong family!' },
  'Ваш друг хочет посмотреть фильм. Посоветуйте ему, какой фильм посмотреть.': { scenarioEn: 'Your friend wants to watch a movie. Recommend one.', answerEn: 'I recommend watching the series "Ragnarok." It has interesting Scandinavian mythology, I really liked it.' },
  'Ваша подруга хочет приготовить вкусное блюдо на день рождения. Посоветуйте ей.': { scenarioEn: 'Your friend wants to cook a delicious dish for a birthday. Advise her.', answerEn: 'I recommend cooking Chinese meat or Uzbek plov. It\'s not very hard, but very tasty!' },
  'Ваш друг окончил школу. Посоветуйте ему хороший университет.': { scenarioEn: 'Your friend graduated from school. Recommend a good university.', answerEn: 'I recommend enrolling at ITMO University in St. Petersburg. They have excellent programs in technology and programming.' },
  'Ваш друг хочет подарить девушке подарок. Посоветуйте, что можно подарить.': { scenarioEn: 'Your friend wants to give his girlfriend a gift. Advise what to give.', answerEn: 'Give her beautiful flowers and nice perfume. Girls always like that.' },
  'Вы были в гостях у друга и забыли свою тетрадь. Позвоните и объясните.': { scenarioEn: 'You visited a friend and forgot your notebook. Call and explain.', answerEn: 'Hello! Sorry, I forgot my Russian language notebook at your place. Can I come pick it up tomorrow morning?' },
};

export const extraTranslations: Record<string, { qEn: string; aEn: string }> = {
  // About yourself & life in Russia
  'Сколько времени вы живете в России?': { qEn: 'How long have you been living in Russia?', aEn: 'I\'ve been living in Russia for several months. I came last year.' },
  'Как долго вы изучаете русский язык?': { qEn: 'How long have you been studying Russian?', aEn: 'I\'ve also been studying Russian for several months, at the preparatory faculty at ITMO.' },
  'Во сколько вы обычно возвращаетесь домой?': { qEn: 'What time do you usually come home?', aEn: 'I usually return to our dorm on Vyazemsky in the evening, around six or seven o\'clock.' },
  'Где вы уже были в Петербурге?': { qEn: 'Where have you already been in St. Petersburg?', aEn: 'I\'ve already walked around the city center, been on Nevsky Prospect, and seen beautiful parks.' },
  'Где в вашем городе можно изучать русский язык?': { qEn: 'Where can you study Russian in your city?', aEn: 'In my hometown Bogor there are no Russian language schools, so it\'s better to study it online.' },
  // Daily routine & weekends
  'Во сколько вы ложитесь спать?': { qEn: 'What time do you go to bed?', aEn: 'I usually go to bed quite late, around midnight.' },
  'Во сколько вы обычно встаете в выходные?': { qEn: 'What time do you usually wake up on weekends?', aEn: 'On weekends I like to sleep in, so I get up at ten or eleven in the morning.' },
  'Во сколько вы выходите из дома в субботу?': { qEn: 'What time do you leave home on Saturday?', aEn: 'On Saturday I leave home in the afternoon. I usually go to the gym for a workout.' },
  'Во сколько начинаются ваши уроки в субботу?': { qEn: 'What time do your classes start on Saturday?', aEn: 'On Saturday I have no classes, it\'s my day off. I rest.' },
  'Какой ваш любимый день недели? Почему?': { qEn: 'What is your favorite day of the week? Why?', aEn: 'My favorite day is Saturday, because I don\'t study and can go to the gym or cook something tasty.' },
  // Internet & hobbies
  'Что вы обычно делаете в интернете?': { qEn: 'What do you usually do on the internet?', aEn: 'I work on the internet. I\'m a programmer, so I spend a lot of time on the computer.' },
  'Что вы обычно смотрите на YouTube?': { qEn: 'What do you usually watch on YouTube?', aEn: 'On YouTube I usually watch videos about Russia, because in the future I want to make my own vlog. I also listen to classical music.' },
  'Какие фильмы вы предпочитаете смотреть?': { qEn: 'What kind of movies do you prefer to watch?', aEn: 'I prefer watching series about Scandinavian mythology, for example, "Ragnarok." It\'s very interesting.' },
  'Что вы предпочитаете: фильмы или книги? Почему?': { qEn: 'What do you prefer: movies or books? Why?', aEn: 'I prefer movies. It\'s faster, and I like watching beautiful visual stories.' },
  'Какое ваше любимое время года и почему?': { qEn: 'What is your favorite season and why?', aEn: 'My favorite season is summer. In summer it\'s warm and you can walk in nature, and I love traveling.' },
  'Какой ваш любимый цвет?': { qEn: 'What is your favorite color?', aEn: 'My favorite color is blue.' },
  // Food
  'Где вы покупаете продукты?': { qEn: 'Where do you buy groceries?', aEn: 'I buy groceries at a supermarket near my dormitory.' },
  'Где можно купить пиво?': { qEn: 'Where can you buy beer?', aEn: 'You can buy beer at any supermarket or bar. But I prefer drinking water or tea because I exercise.' },
  'Как долго вы обычно готовите ужин?': { qEn: 'How long do you usually cook dinner?', aEn: 'I really love cooking. I usually cook dinner for about one hour.' },
  'Какое ваше любимое блюдо?': { qEn: 'What is your favorite dish?', aEn: 'My favorite dish is Uzbek plov. It\'s very tasty!' },
  'Какую кухню вы любите?': { qEn: 'What cuisine do you like?', aEn: 'I really love Indonesian and Chinese cuisine.' },
  // Family & future
  'Чем занимаются ваши родители?': { qEn: 'What do your parents do?', aEn: 'My mom sells food, and my dad works as an electrical engineer. By the way, he also cooks very well.' },
  'В какой город вы хотите поехать и почему?': { qEn: 'Which city do you want to visit and why?', aEn: 'I want to go to Moscow or Karelia because I love traveling and seeing beautiful nature.' },
  'В каком городе вы хотите жить? Почему?': { qEn: 'Which city do you want to live in? Why?', aEn: 'I like living in St. Petersburg because it\'s a beautiful city with a good university.' },
  'Где вы хотите работать и почему?': { qEn: 'Where do you want to work and why?', aEn: 'I work as a programmer and want to create my own tech startup in the future because I love technology.' },
};

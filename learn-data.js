/*
 * Allez! French – A1 course content for the Lessons tab.
 *
 * LESSONS: grammar in the usual A1 order. Each has
 *   cards: [title, text]           short explanation
 *   ex:    [french, english]       examples (tap to hear)
 *   q:     [prompt, answer, 'wrong|wrong|wrong', english hint]
 *          "___" in the prompt marks the gap. The answer is always given first
 *          here; options are shuffled when the quiz starts.
 *
 * DIALOGUES: short everyday conversations for listening and reading.
 *   lines: [speaker, french, english]   (speaker 'A' or 'B')
 *   q:     [question, answer, 'wrong|wrong|wrong']
 */
window.A1 = {
LESSONS: [
{ id: 'etre', title: 'Je suis… (être, to be)', goal: 'Say who you are, where you are, what you are like.',
  cards: [
    ['Subject pronouns', 'je (I) · tu (you, one friend) · il (he) · elle (she) · on (we, informal) · nous (we) · vous (you: polite or plural) · ils (they, men or mixed) · elles (they, only women).'],
    ['être', 'je suis · tu es · il / elle / on est · nous sommes · vous êtes · ils / elles sont.'],
    ['je → j’', 'Before a vowel or a silent h, je becomes j’: j’ai, j’habite. Not with être: je suis.'],
    ['tu or vous?', 'tu for a friend, a child, family. vous for someone you don’t know, someone older, or more than one person.']
  ],
  ex: [['Je suis étudiant.', 'I am a student.'], ['Tu es français ?', 'Are you French?'], ['Elle est très gentille.', 'She is very kind.'], ['Nous sommes à Paris.', 'We are in Paris.'], ['Vous êtes prêts ?', 'Are you ready?'], ['Ils sont en retard.', 'They are late.']],
  q: [
    ['Je ___ étudiant.', 'suis', 'es|est|sommes', 'I am a student.'],
    ['Tu ___ fatigué ?', 'es', 'suis|êtes|sont', 'Are you tired?'],
    ['Paul ___ médecin.', 'est', 'es|sont|êtes', 'Paul is a doctor.'],
    ['Nous ___ amis.', 'sommes', 'sont|êtes|suis', 'We are friends.'],
    ['Vous ___ madame Martin ?', 'êtes', 'es|sommes|est', 'Are you Mrs Martin?'],
    ['Marie et Léa ___ sœurs.', 'sont', 'est|sommes|êtes', 'Marie and Léa are sisters.'],
    ['___ suis indien.', 'Je', 'Tu|Il|Nous', 'I am Indian.'],
    ['Talking to your teacher, you say:', 'Vous êtes gentil.', 'Tu es gentil.|Tu êtes gentil.|Vous es gentil.', 'Polite form.']
  ] },

{ id: 'avoir', title: 'J’ai… (avoir, to have)', goal: 'Talk about what you have, your age, how you feel.',
  cards: [
    ['avoir', 'j’ai · tu as · il / elle / on a · nous avons · vous avez · ils / elles ont.'],
    ['Age uses avoir', 'French says “I have 20 years”: J’ai vingt ans. Never “je suis vingt ans”.'],
    ['Feelings with avoir', 'avoir faim (hungry) · avoir soif (thirsty) · avoir froid (cold) · avoir chaud (hot) · avoir peur (afraid) · avoir sommeil (sleepy).'],
    ['il y a', 'il y a = there is / there are. Il y a un parc. Il y a des enfants.']
  ],
  ex: [['J’ai deux frères.', 'I have two brothers.'], ['Tu as quel âge ?', 'How old are you?'], ['J’ai vingt-cinq ans.', 'I am twenty-five.'], ['Nous avons faim.', 'We are hungry.'], ['Il y a un café ici.', 'There is a café here.'], ['Ils ont une voiture.', 'They have a car.']],
  q: [
    ['J’___ un chat.', 'ai', 'as|a|ont', 'I have a cat.'],
    ['Tu ___ quel âge ?', 'as', 'es|a|avez', 'How old are you?'],
    ['Elle ___ trente ans.', 'a', 'est|as|ont', 'She is thirty.'],
    ['Nous ___ une maison.', 'avons', 'avez|ont|sommes', 'We have a house.'],
    ['Vous ___ des enfants ?', 'avez', 'avons|êtes|as', 'Do you have children?'],
    ['Ils ___ soif.', 'ont', 'sont|a|avons', 'They are thirsty.'],
    ['I am 18:', 'J’ai dix-huit ans.', 'Je suis dix-huit ans.|J’ai dix-huit.|Je suis dix-huit.', 'Age uses avoir.'],
    ['___ un problème.', 'Il y a', 'Il a y|Il est|Y a il', 'There is a problem.']
  ] },

{ id: 'articles', title: 'Un, une, le, la: articles and gender', goal: 'Use the right “a” and “the” for every noun.',
  cards: [
    ['Every noun is masculine or feminine', 'Learn each noun with its article: un livre (m.), une table (f.). There is often no logic, so the article is part of the word.'],
    ['a / some', 'un (m.) · une (f.) · des (plural): un garçon, une fille, des enfants.'],
    ['the', 'le (m.) · la (f.) · l’ (before a vowel or silent h) · les (plural): le pain, la mer, l’école, les amis.'],
    ['Tips for gender', 'Often feminine: words ending in -tion, -té, -ette, -ence: la nation, la liberté. Often masculine: -ment, -age, -eau: le moment, le fromage, le gâteau.']
  ],
  ex: [['un croissant et une baguette', 'a croissant and a baguette'], ['le garçon et la fille', 'the boy and the girl'], ['l’hôtel et l’école', 'the hotel and the school'], ['les livres', 'the books'], ['J’ai des amis à Lyon.', 'I have friends in Lyon.'], ['J’aime le chocolat.', 'I like chocolate.']],
  q: [
    ['___ table (f.)', 'une', 'un|le|des', 'a table'],
    ['___ livre (m.)', 'un', 'une|la|des', 'a book'],
    ['___ école', 'l’', 'le|la|les', 'the school'],
    ['___ enfants', 'les', 'le|la|l’', 'the children'],
    ['___ soleil (m.)', 'le', 'la|l’|une', 'the sun'],
    ['___ maison (f.)', 'la', 'le|l’|un', 'the house'],
    ['J’ai ___ chiens.', 'des', 'un|une|le', 'I have (some) dogs.'],
    ['Which word is feminine?', 'nation', 'fromage|moment|gâteau', '-tion words are usually feminine.']
  ] },

{ id: 'adjectives', title: 'Plural and adjectives', goal: 'Describe people and things correctly.',
  cards: [
    ['Plural', 'Add -s (usually silent): un livre → des livres. -eau adds -x: un gâteau → des gâteaux. -al → -aux: un journal → des journaux.'],
    ['Adjectives agree', 'Feminine adds -e: grand → grande. Plural adds -s: grands, grandes. If the adjective already ends in -e: jeune, jeune.'],
    ['Special feminines', 'gentil → gentille · bon → bonne · italien → italienne · heureux → heureuse · sportif → sportive · beau → belle · vieux → vieille · nouveau → nouvelle.'],
    ['Where they go', 'Most adjectives come after the noun: une voiture rouge. Some short common ones come before: beau, bon, grand, petit, jeune, vieux, joli, nouveau: une petite maison.']
  ],
  ex: [['un homme grand', 'a tall man'], ['une femme grande', 'a tall woman'], ['des chats noirs', 'black cats'], ['une petite maison blanche', 'a small white house'], ['Elle est heureuse.', 'She is happy.'], ['Ils sont gentils.', 'They are kind.']],
  q: [
    ['Elle est ___. (grand)', 'grande', 'grand|grands|grandes', 'She is tall.'],
    ['Ils sont ___. (content)', 'contents', 'content|contente|contentes', 'They are happy.'],
    ['une robe ___ (blanc)', 'blanche', 'blanc|blancs|blanches', 'a white dress'],
    ['Ma sœur est ___. (gentil)', 'gentille', 'gentil|gentile|gentils', 'My sister is kind.'],
    ['des ___ (gâteau)', 'gâteaux', 'gâteaus|gâteau|gâteaues', 'cakes'],
    ['a red car:', 'une voiture rouge', 'une rouge voiture|un voiture rouge|une voiture rouges', 'Colour after the noun.'],
    ['a small house:', 'une petite maison', 'une maison petit|un petit maison|une maison petite', 'petit goes before.'],
    ['Elle est ___. (italien)', 'italienne', 'italien|italiene|italiens', 'She is Italian.']
  ] },

{ id: 'er', title: 'Regular -er verbs', goal: 'Use hundreds of verbs: parler, aimer, habiter…',
  cards: [
    ['The pattern', 'Remove -er, then add: je -e · tu -es · il -e · nous -ons · vous -ez · ils -ent. parler: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.'],
    ['Pronunciation', 'je parle, tu parles, il parle and ils parlent all sound the same: “parl”. Only nous (-ons) and vous (-ez) sound different.'],
    ['Small spelling changes', 'manger → nous mangeons (keeps the soft g). commencer → nous commençons. acheter → j’achète. appeler → j’appelle.'],
    ['Two verbs together', 'The second verb stays in the infinitive: J’aime danser. Je déteste attendre.']
  ],
  ex: [['Je parle anglais.', 'I speak English.'], ['Tu habites où ?', 'Where do you live?'], ['Nous mangeons à midi.', 'We eat at noon.'], ['Vous travaillez ici ?', 'Do you work here?'], ['Ils écoutent de la musique.', 'They listen to music.'], ['J’aime voyager.', 'I like travelling.']],
  q: [
    ['Je ___ (parler) français.', 'parle', 'parles|parlons|parler', 'I speak French.'],
    ['Tu ___ (habiter) à Lyon ?', 'habites', 'habite|habitez|habitent', 'Do you live in Lyon?'],
    ['Nous ___ (travailler) ensemble.', 'travaillons', 'travaillez|travaillent|travaille', 'We work together.'],
    ['Vous ___ (aimer) le café ?', 'aimez', 'aimons|aiment|aimes', 'Do you like coffee?'],
    ['Ils ___ (regarder) la télé.', 'regardent', 'regarde|regardons|regardez', 'They watch TV.'],
    ['Nous ___ (manger) du pain.', 'mangeons', 'mangons|mangez|mange', 'We eat bread.'],
    ['J’aime ___ .', 'chanter', 'chante|chantes|chanté', 'I like singing.'],
    ['Elle ___ (écouter) la radio.', 'écoute', 'écoutes|écoutent|écouter', 'She listens to the radio.']
  ] },

{ id: 'negation', title: 'Ne… pas: saying no', goal: 'Make any sentence negative.',
  cards: [
    ['ne + verb + pas', 'Je parle → Je ne parle pas. ne becomes n’ before a vowel: Je n’aime pas.'],
    ['un, une, des, du → de', 'After a negative, “a / some” becomes de (d’): J’ai un chat → Je n’ai pas de chat. Il y a du pain → Il n’y a pas de pain.'],
    ['le, la, les stay', 'J’aime le café → Je n’aime pas le café.'],
    ['Other negatives', 'ne… jamais (never) · ne… rien (nothing) · ne… plus (no longer). In speech people often drop ne: J’sais pas.']
  ],
  ex: [['Je ne comprends pas.', 'I don’t understand.'], ['Il n’est pas là.', 'He is not here.'], ['Je n’ai pas de voiture.', 'I don’t have a car.'], ['Elle ne mange jamais de viande.', 'She never eats meat.'], ['Nous n’avons rien.', 'We have nothing.'], ['Je n’habite plus à Paris.', 'I don’t live in Paris any more.']],
  q: [
    ['Je ___ parle pas allemand.', 'ne', 'n’|pas|non', 'I don’t speak German.'],
    ['Il ___ aime pas le sport.', 'n’', 'ne|pas|non', 'He doesn’t like sport.'],
    ['Je n’ai pas ___ frère.', 'de', 'un|une|des', 'I don’t have a brother.'],
    ['Il n’y a pas ___ lait.', 'de', 'du|le|des', 'There is no milk.'],
    ['I don’t like coffee:', 'Je n’aime pas le café.', 'Je n’aime pas de café.|Je ne aime pas le café.|Je n’aime le café pas.', 'le stays after aimer.'],
    ['Nous ne sortons ___ le soir.', 'jamais', 'rien|pas de|non', 'We never go out in the evening.'],
    ['Tu ne manges ___ ?', 'rien', 'jamais de|non|pas de', 'You eat nothing?'],
    ['Make it negative: Elle est française.', 'Elle n’est pas française.', 'Elle ne est pas française.|Elle n’est française pas.|Elle pas est française.', '']
  ] },

{ id: 'questions', title: 'Asking questions', goal: 'Ask yes/no questions and use question words.',
  cards: [
    ['Three ways to ask', '1. Raise your voice: Tu parles anglais ? 2. Add est-ce que: Est-ce que tu parles anglais ? 3. Invert (more formal): Parles-tu anglais ?'],
    ['Question words', 'où (where) · quand (when) · comment (how) · pourquoi (why) · combien (how much / many) · qui (who) · qu’est-ce que (what) · quel / quelle (which, what).'],
    ['Where they go', 'Tu habites où ? (spoken) · Où est-ce que tu habites ? · Où habites-tu ?'],
    ['quel agrees', 'quel âge (m.) · quelle heure (f.) · quels livres · quelles couleurs.']
  ],
  ex: [['Tu aimes le thé ?', 'Do you like tea?'], ['Est-ce que vous avez une chambre ?', 'Do you have a room?'], ['Où est la gare ?', 'Where is the station?'], ['Comment tu t’appelles ?', 'What is your name?'], ['Qu’est-ce que tu fais ?', 'What are you doing?'], ['Quelle heure est-il ?', 'What time is it?']],
  q: [
    ['___ habites-tu ? — À Nice.', 'Où', 'Quand|Qui|Combien', 'Where do you live?'],
    ['___ ça coûte ? — 5 euros.', 'Combien', 'Comment|Où|Quand', 'How much is it?'],
    ['___ tu pars ? — Demain.', 'Quand', 'Où|Qui|Pourquoi', 'When are you leaving?'],
    ['___ tu apprends le français ? — Parce que j’aime la France.', 'Pourquoi', 'Comment|Quand|Combien', 'Why?'],
    ['___ est-ce ? — C’est mon frère.', 'Qui', 'Que|Quoi|Où', 'Who is it?'],
    ['___ heure est-il ?', 'Quelle', 'Quel|Quels|Quelles', 'What time is it?'],
    ['___ tu aimes le sport ?', 'Est-ce que', 'Qu’est-ce que|Est-ce|Que', 'Do you like sport?'],
    ['___ tu fais ce soir ?', 'Qu’est-ce que', 'Est-ce que|Quel|Où', 'What are you doing tonight?']
  ] },

{ id: 'aller', title: 'Aller and places: au, à la, aux', goal: 'Say where you go and where things are.',
  cards: [
    ['aller (to go)', 'je vais · tu vas · il va · nous allons · vous allez · ils vont.'],
    ['à + the', 'à + le = au · à + la = à la · à + l’ = à l’ · à + les = aux. Je vais au cinéma, à la plage, à l’école, aux toilettes.'],
    ['de + the', 'de + le = du · de + les = des: Je viens du marché. Elle sort des toilettes.'],
    ['Where is it?', 'sur (on) · sous (under) · dans (in) · devant (in front of) · derrière (behind) · entre (between) · à côté de (next to) · en face de (opposite) · près de (near) · loin de (far from).']
  ],
  ex: [['Je vais au supermarché.', 'I am going to the supermarket.'], ['Tu vas à la banque ?', 'Are you going to the bank?'], ['On va à l’hôpital.', 'We are going to the hospital.'], ['La poste est à côté de la gare.', 'The post office is next to the station.'], ['Le chat est sous la table.', 'The cat is under the table.'], ['Le café est en face du musée.', 'The café is opposite the museum.']],
  q: [
    ['Je ___ à la gare.', 'vais', 'va|vas|allons', 'I am going to the station.'],
    ['Nous ___ au restaurant.', 'allons', 'allez|vont|vais', 'We go to the restaurant.'],
    ['Ils ___ à Paris.', 'vont', 'va|allez|vais', 'They go to Paris.'],
    ['Je vais ___ cinéma.', 'au', 'à le|à la|aux', 'to the cinema'],
    ['Elle va ___ pharmacie.', 'à la', 'au|aux|à l’', 'to the pharmacy'],
    ['Tu vas ___ école ?', 'à l’', 'au|à la|aux', 'to school'],
    ['La banque est en face ___ musée.', 'du', 'de le|de la|des', 'opposite the museum'],
    ['The book is on the table:', 'Le livre est sur la table.', 'Le livre est sous la table.|Le livre est dans la table.|Le livre est sur le table.', '']
  ] },

{ id: 'countries', title: 'Countries, cities, nationalities', goal: 'Say where you come from and where you live.',
  cards: [
    ['Cities: à', 'J’habite à Paris. Je vais à Londres.'],
    ['Countries: en, au, aux', 'Feminine countries (most end in -e): en France, en Inde, en Italie. Masculine: au Japon, au Canada, au Maroc. Plural: aux États-Unis.'],
    ['Coming from', 'de / d’ for cities and feminine countries: Je viens de Paris, d’Inde. du for masculine: du Japon. des for plural: des États-Unis.'],
    ['Nationalities', 'No capital letter in French: il est français, elle est française. indien / indienne · anglais / anglaise · américain / américaine · espagnol / espagnole · allemand / allemande · chinois / chinoise · japonais / japonaise.']
  ],
  ex: [['J’habite en France.', 'I live in France.'], ['Il travaille au Canada.', 'He works in Canada.'], ['Je viens d’Inde.', 'I come from India.'], ['Elle est allemande.', 'She is German.'], ['Nous allons aux États-Unis.', 'We are going to the USA.'], ['Tu es de quelle nationalité ?', 'What is your nationality?']],
  q: [
    ['J’habite ___ Rome.', 'à', 'en|au|aux', 'I live in Rome.'],
    ['Elle travaille ___ Espagne.', 'en', 'à|au|aux', 'She works in Spain.'],
    ['Ils vont ___ Portugal.', 'au', 'en|à|aux', 'They go to Portugal.'],
    ['Je suis né ___ États-Unis.', 'aux', 'au|en|à', 'I was born in the USA.'],
    ['Je viens ___ Japon.', 'du', 'de|d’|des', 'I come from Japan.'],
    ['Je viens ___ Italie.', 'd’', 'de|du|des', 'I come from Italy.'],
    ['Elle est ___ .', 'française', 'français|Française|françaises', 'She is French.'],
    ['Il est indien, elle est ___ .', 'indienne', 'indien|indiene|indiennes', 'She is Indian.']
  ] },

{ id: 'possessives', title: 'Mon, ma, mes: possessives', goal: 'Talk about your family and your things.',
  cards: [
    ['The table', 'my: mon (m.) · ma (f.) · mes (pl.) · your (tu): ton · ta · tes · his / her: son · sa · ses · our: notre · nos · your (vous): votre · vos · their: leur · leurs.'],
    ['It agrees with the thing', 'son / sa depends on the thing, not the owner: sa voiture = his car or her car. son frère = his brother or her brother.'],
    ['ma → mon before a vowel', 'mon amie (not ma amie), ton école, son adresse.']
  ],
  ex: [['C’est mon père.', 'This is my father.'], ['Voici ma sœur et mes parents.', 'Here are my sister and my parents.'], ['Tu as ton passeport ?', 'Do you have your passport?'], ['Elle aime son travail.', 'She likes her job.'], ['Notre maison est petite.', 'Our house is small.'], ['Ils parlent à leurs enfants.', 'They talk to their children.']],
  q: [
    ['C’est ___ mère.', 'ma', 'mon|mes|ta', 'This is my mother.'],
    ['___ frères sont grands.', 'Mes', 'Mon|Ma|Son', 'My brothers are tall.'],
    ['C’est ___ amie Julie.', 'mon', 'ma|mes|sa', 'This is my friend Julie.'],
    ['Paul aime ___ voiture.', 'sa', 'son|ses|leur', 'Paul likes his car.'],
    ['Marie parle à ___ père.', 'son', 'sa|ses|leur', 'Marie talks to her father.'],
    ['Vous avez ___ billets ?', 'vos', 'votre|vous|leurs', 'Do you have your tickets?'],
    ['___ appartement est grand. (we)', 'Notre', 'Nos|Votre|Mon', 'Our flat is big.'],
    ['Ils adorent ___ chien.', 'leur', 'leurs|son|ses', 'They love their dog.']
  ] },

{ id: 'cest', title: 'Ce, cette, ces · c’est or il est', goal: 'Point at things and describe them.',
  cards: [
    ['this / that', 'ce (m.) · cet (m. before a vowel) · cette (f.) · ces (pl.): ce livre, cet homme, cette voiture, ces chaussures.'],
    ['c’est + noun', 'Use c’est with an article or a name: C’est un ami. C’est Paul. C’est mon livre. Plural: ce sont mes amis.'],
    ['il / elle est + adjective or job', 'Il est grand. Elle est médecin (no article with jobs). But: C’est un bon médecin.'],
    ['C’est + adjective for general things', 'C’est beau ! C’est facile. C’est cher.']
  ],
  ex: [['Ce pull est joli.', 'This jumper is pretty.'], ['Cet hôtel est cher.', 'This hotel is expensive.'], ['Cette fille est ma cousine.', 'This girl is my cousin.'], ['C’est un bon restaurant.', 'It is a good restaurant.'], ['Elle est professeure.', 'She is a teacher.'], ['C’est délicieux !', 'It’s delicious!']],
  q: [
    ['___ livre est intéressant.', 'Ce', 'Cet|Cette|Ces', 'This book is interesting.'],
    ['___ ami est sympa.', 'Cet', 'Ce|Cette|Ces', 'This friend is nice.'],
    ['___ maison est grande.', 'Cette', 'Ce|Cet|Ces', 'This house is big.'],
    ['___ chaussures sont chères.', 'Ces', 'Ce|Cet|Cette', 'These shoes are expensive.'],
    ['___ mon frère.', 'C’est', 'Il est|Elle est|Ce sont', 'This is my brother.'],
    ['Il ___ ingénieur.', 'est', 'est un|c’est|sont', 'He is an engineer.'],
    ['___ très beau, Paris !', 'C’est', 'Il est|Elle est|Cet', 'Paris is very beautiful!'],
    ['___ mes parents.', 'Ce sont', 'C’est|Ils est|Ces', 'These are my parents.']
  ] },

{ id: 'partitive', title: 'Du, de la, des: food and quantities', goal: 'Order, shop and talk about food.',
  cards: [
    ['some', 'du (m.) · de la (f.) · de l’ (vowel) · des (pl.): Je mange du pain, de la soupe, de l’eau, des fruits.'],
    ['Likes use le, la, les', 'J’aime le fromage (in general). Je mange du fromage (some of it).'],
    ['Quantities use de', 'un kilo de pommes · une bouteille d’eau · un peu de sucre · beaucoup de travail · trop de bruit.'],
    ['Ordering', 'Je voudrais un café, s’il vous plaît. Je prends le menu. L’addition, s’il vous plaît.']
  ],
  ex: [['Je voudrais du pain.', 'I would like some bread.'], ['Tu bois de l’eau ?', 'Do you drink water?'], ['Elle achète des tomates.', 'She buys tomatoes.'], ['Un kilo de pommes, s’il vous plaît.', 'A kilo of apples, please.'], ['J’aime le chocolat.', 'I like chocolate.'], ['Il y a beaucoup de monde.', 'There are a lot of people.']],
  q: [
    ['Je mange ___ pain.', 'du', 'de la|des|de l’', 'I eat bread.'],
    ['Tu veux ___ soupe ?', 'de la', 'du|de l’|des', 'Do you want some soup?'],
    ['Il boit ___ eau.', 'de l’', 'du|de la|des', 'He drinks water.'],
    ['Nous achetons ___ légumes.', 'des', 'du|de la|de', 'We buy vegetables.'],
    ['J’aime ___ fromage.', 'le', 'du|de|un', 'I like cheese.'],
    ['une bouteille ___ vin', 'de', 'du|des|de la', 'a bottle of wine'],
    ['beaucoup ___ amis', 'd’', 'des|de les|du', 'a lot of friends'],
    ['Ordering politely:', 'Je voudrais un thé, s’il vous plaît.', 'Je veux thé.|Donne un thé.|Je voudrais de thé.', '']
  ] },

{ id: 'faire', title: 'Faire, prendre, vouloir, pouvoir', goal: 'The irregular verbs you use all day.',
  cards: [
    ['faire (do / make)', 'je fais · tu fais · il fait · nous faisons · vous faites · ils font. Il fait beau (weather). Je fais du sport.'],
    ['prendre (take)', 'je prends · tu prends · il prend · nous prenons · vous prenez · ils prennent. Same: apprendre, comprendre.'],
    ['vouloir (want) · pouvoir (can)', 'je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent · je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent. Polite: je voudrais.'],
    ['devoir (must) + infinitive', 'je dois, tu dois, il doit, nous devons, vous devez, ils doivent. Je dois partir. Tu peux venir ? Je veux dormir.']
  ],
  ex: [['Qu’est-ce que tu fais ?', 'What are you doing?'], ['Je fais la cuisine.', 'I am cooking.'], ['Je prends le bus.', 'I take the bus.'], ['Tu veux un café ?', 'Do you want a coffee?'], ['Vous pouvez répéter ?', 'Can you repeat?'], ['Je dois travailler.', 'I have to work.']],
  q: [
    ['Nous ___ du sport.', 'faisons', 'faisez|font|fait', 'We do sport.'],
    ['Vous ___ quoi ce week-end ?', 'faites', 'faisez|faisons|font', 'What are you doing this weekend?'],
    ['Je ___ le métro.', 'prends', 'prend|prenons|prendre', 'I take the metro.'],
    ['Ils ___ le train.', 'prennent', 'prenent|prend|prenons', 'They take the train.'],
    ['Tu ___ un thé ?', 'veux', 'veut|voulez|voulons', 'Do you want a tea?'],
    ['Vous ___ m’aider ?', 'pouvez', 'pouvons|peut|peux', 'Can you help me?'],
    ['Je dois ___ .', 'partir', 'pars|part|parti', 'I have to leave.'],
    ['Il ___ beau aujourd’hui.', 'fait', 'a|va|fais', 'The weather is nice today.']
  ] },

{ id: 'time', title: 'Telling the time and dates', goal: 'Say the time, the day and the date.',
  cards: [
    ['The time', 'Quelle heure est-il ? Il est une heure, deux heures… Il est midi (12:00), minuit (00:00).'],
    ['Minutes', 'et quart (:15) · et demie (:30) · moins le quart (:45 of the next hour) · moins dix (:50). 8:20 = huit heures vingt. 8:50 = neuf heures moins dix.'],
    ['24-hour time', 'Timetables use 24 h: Le train part à dix-huit heures trente (18:30).'],
    ['Dates', 'le + number + month: le 14 juillet, le 3 mars. The 1st is le premier: le premier mai. Days and months have no capital letter. Nous sommes lundi.']
  ],
  ex: [['Il est huit heures.', 'It is eight o’clock.'], ['Il est neuf heures et quart.', 'It is quarter past nine.'], ['Il est midi et demi.', 'It is half past twelve.'], ['Il est dix heures moins le quart.', 'It is quarter to ten.'], ['Le cours commence à quatorze heures.', 'The class starts at 2 pm.'], ['Mon anniversaire, c’est le premier avril.', 'My birthday is the 1st of April.']],
  q: [
    ['7:15 = sept heures ___', 'et quart', 'et demie|moins le quart|quinze moins', ''],
    ['10:30 = dix heures ___', 'et demie', 'et quart|moins trente|trente et', ''],
    ['5:45 = ___ heures moins le quart', 'six', 'cinq|quatre|sept', ''],
    ['12:00 (day) = il est ___', 'midi', 'minuit|douze|zéro heure', ''],
    ['1st May = le ___ mai', 'premier', 'un|première|unième', ''],
    ['The train leaves at 18:30:', 'à dix-huit heures trente', 'à huit heures trente|à six heures trente|à dix-huit et demie heures', ''],
    ['Which is correct?', 'Nous sommes mardi.', 'Nous sommes Mardi.|Nous avons mardi.|Nous sommes en mardi.', 'No capital for days.'],
    ['3:50 = ___', 'quatre heures moins dix', 'trois heures moins dix|trois heures dix|quatre heures dix', '']
  ] },

{ id: 'reflexive', title: 'Je me lève: daily routine', goal: 'Describe your day.',
  cards: [
    ['Reflexive verbs', 'They have an extra pronoun: je me · tu te · il se · nous nous · vous vous · ils se. se lever: je me lève, tu te lèves, il se lève…'],
    ['me → m’ before a vowel', 'je m’appelle, il s’habille, tu t’amuses.'],
    ['Common ones', 'se réveiller (wake up) · se lever (get up) · se laver (wash) · se doucher (shower) · s’habiller (get dressed) · se coucher (go to bed) · se reposer (rest).'],
    ['Linking words', 'd’abord (first) · ensuite / puis (then) · après (after) · enfin (finally) · le matin, l’après-midi, le soir.']
  ],
  ex: [['Je me réveille à sept heures.', 'I wake up at seven.'], ['D’abord, je me douche.', 'First, I shower.'], ['Ensuite, je m’habille.', 'Then I get dressed.'], ['Tu te couches tard ?', 'Do you go to bed late?'], ['Nous nous reposons le dimanche.', 'We rest on Sundays.'], ['Il s’appelle Thomas.', 'His name is Thomas.']],
  q: [
    ['Je ___ lève à 7 h.', 'me', 'te|se|nous', 'I get up at 7.'],
    ['Tu ___ couches à quelle heure ?', 'te', 'me|se|vous', 'What time do you go to bed?'],
    ['Elle ___ habille.', 's’', 'se|me|t’', 'She gets dressed.'],
    ['Nous ___ reposons.', 'nous', 'se|vous|me', 'We rest.'],
    ['Vous ___ appelez comment ?', 'vous', 'nous|se|te', 'What is your name?'],
    ['Ils ___ lavent les mains.', 'se', 'me|nous|leur', 'They wash their hands.'],
    ['___, je prends mon petit déjeuner.', 'Ensuite', 'Hier|Jamais|Pourquoi', 'Then I have breakfast.'],
    ['I go to bed at 11:', 'Je me couche à onze heures.', 'Je couche à onze heures.|Je me couche onze heures.|Je se couche à onze heures.', '']
  ] },

{ id: 'future', title: 'Near future: je vais + verb', goal: 'Talk about plans.',
  cards: [
    ['aller + infinitive', 'je vais manger · tu vas partir · il va pleuvoir · nous allons voyager · vous allez voir · ils vont arriver.'],
    ['Time words', 'demain (tomorrow) · ce soir (tonight) · ce week-end · la semaine prochaine (next week) · l’année prochaine (next year) · bientôt (soon).'],
    ['Negative', 'ne… pas goes around aller: Je ne vais pas sortir.'],
    ['Just did: venir de', 'venir de + infinitive = have just: Je viens de manger. Elle vient d’arriver.']
  ],
  ex: [['Je vais visiter Paris.', 'I am going to visit Paris.'], ['Il va pleuvoir.', 'It is going to rain.'], ['Nous allons partir demain.', 'We are leaving tomorrow.'], ['Qu’est-ce que tu vas faire ce soir ?', 'What are you going to do tonight?'], ['Je ne vais pas travailler.', 'I am not going to work.'], ['Le film vient de commencer.', 'The film has just started.']],
  q: [
    ['Je ___ regarder un film.', 'vais', 'va|vas|allons', 'I am going to watch a film.'],
    ['Nous ___ manger au restaurant.', 'allons', 'allez|vont|vais', 'We are going to eat out.'],
    ['Ils vont ___ demain.', 'arriver', 'arrivent|arrivé|arrive', 'They arrive tomorrow.'],
    ['Tu vas ___ quoi ?', 'faire', 'fais|fait|faites', 'What are you going to do?'],
    ['I’m not going to go out:', 'Je ne vais pas sortir.', 'Je vais ne pas sortir.|Je ne vais sortir pas.|Je vais pas ne sortir.', ''],
    ['La semaine ___', 'prochaine', 'prochain|dernière|future', 'next week'],
    ['Je ___ de finir. (I have just finished)', 'viens', 'vais|suis|fais', ''],
    ['Il ___ pleuvoir.', 'va', 'vais|vient|fait', 'It is going to rain.']
  ] },

{ id: 'past', title: 'Passé composé: talking about the past', goal: 'Say what you did yesterday.',
  cards: [
    ['avoir + past participle', 'j’ai mangé · tu as parlé · il a regardé · nous avons visité · vous avez fini · ils ont pris.'],
    ['Past participles', '-er → -é: parler → parlé. -ir → -i: finir → fini. Irregular: avoir → eu · être → été · faire → fait · prendre → pris · voir → vu · boire → bu · lire → lu · écrire → écrit.'],
    ['Some verbs use être', 'aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, rentrer + all reflexive verbs. The participle agrees: elle est allée, ils sont partis.'],
    ['Negative and time words', 'Je n’ai pas mangé. hier (yesterday) · la semaine dernière (last week) · il y a deux jours (two days ago).']
  ],
  ex: [['Hier, j’ai mangé une pizza.', 'Yesterday I ate a pizza.'], ['Nous avons visité le musée.', 'We visited the museum.'], ['Tu as vu le film ?', 'Did you see the film?'], ['Elle est allée à Rome.', 'She went to Rome.'], ['Ils sont arrivés hier soir.', 'They arrived last night.'], ['Je n’ai pas compris.', 'I didn’t understand.']],
  q: [
    ['Hier, j’___ regardé la télé.', 'ai', 'suis|as|a', 'Yesterday I watched TV.'],
    ['Nous avons ___ (visiter) Lyon.', 'visité', 'visiter|visitons|visite', 'We visited Lyon.'],
    ['Tu as ___ (finir) ?', 'fini', 'finé|finis|finir', 'Have you finished?'],
    ['Elle ___ allée au cinéma.', 'est', 'a|ai|es', 'She went to the cinema.'],
    ['Ils sont ___ (partir) à 8 h.', 'partis', 'parti|partir|partent', 'They left at 8.'],
    ['J’ai ___ (prendre) le bus.', 'pris', 'prendu|prené|prends', 'I took the bus.'],
    ['Vous avez ___ (faire) les courses ?', 'fait', 'faisé|faire|faites', 'Did you do the shopping?'],
    ['I didn’t eat:', 'Je n’ai pas mangé.', 'Je n’ai mangé pas.|Je ne pas ai mangé.|Je n’ai pas manger.', '']
  ] },

{ id: 'imperative', title: 'Instructions: the imperative', goal: 'Give and understand directions and instructions.',
  cards: [
    ['How', 'Use the tu, nous or vous form without the pronoun: Regarde ! Allons-y ! Écoutez !'],
    ['-er verbs drop the -s with tu', 'tu manges → Mange ! tu parles → Parle plus fort !'],
    ['Directions', 'Tournez à gauche · Tournez à droite · Allez tout droit · Prenez la deuxième rue · Traversez la place.'],
    ['Negative and polite', 'Ne parle pas ! Ne touchez pas. Add s’il te plaît / s’il vous plaît to be polite. Irregular: Sois sage ! (être) · Ayez de la patience (avoir).']
  ],
  ex: [['Tournez à gauche.', 'Turn left.'], ['Allez tout droit.', 'Go straight on.'], ['Prenez la première rue à droite.', 'Take the first street on the right.'], ['Écoute bien !', 'Listen carefully!'], ['Allons au parc !', 'Let’s go to the park!'], ['Ne fumez pas ici.', 'Don’t smoke here.']],
  q: [
    ['(to a stranger) ___ à droite.', 'Tournez', 'Tournes|Tourner|Tourné', 'Turn right.'],
    ['(to a friend) ___ la porte !', 'Ferme', 'Fermes|Fermez|Fermer', 'Close the door!'],
    ['___ au cinéma ! (let’s go)', 'Allons', 'Allez|Va|Aller', 'Let’s go to the cinema!'],
    ['Allez tout ___ .', 'droit', 'droite|gauche|droits', 'Go straight on.'],
    ['Ne ___ pas ! (tu, parler)', 'parle', 'parles|parlez|parler', 'Don’t talk!'],
    ['___ la deuxième rue. (vous)', 'Prenez', 'Prends|Prenons|Prendre', 'Take the second street.'],
    ['(to a child) ___ sage !', 'Sois', 'Es|Être|Soit', 'Be good!'],
    ['Don’t touch (vous):', 'Ne touchez pas.', 'Touchez pas ne.|Ne pas touchez.|Ne touche pas vous.', '']
  ] },

{ id: 'writing', title: 'Writing a short message', goal: 'Fill in a form and write a postcard, email or text.',
  cards: [
    ['Forms', 'Nom (surname) · Prénom (first name) · Âge · Date de naissance (date of birth) · Nationalité · Adresse · Code postal · Ville · Téléphone · Courriel / e-mail · Profession.'],
    ['Start and finish', 'Friends: Salut Léa ! / Coucou ! … Bisous, Grosses bises, À bientôt. Formal: Bonjour Madame, / Monsieur, … Cordialement, Bonne journée.'],
    ['Useful lines', 'Je suis à Nice avec ma famille. Il fait beau. L’hôtel est super. Tu veux venir samedi ? On se retrouve à 20 h devant le cinéma. Merci pour l’invitation !'],
    ['A1 writing task', 'In the exam you write about 40 to 50 words: say where you are, what you do, what the weather is like, and ask or invite. Short sentences are perfect.']
  ],
  ex: [['Salut Marc ! Je suis en vacances à Nice.', 'Hi Marc! I am on holiday in Nice.'], ['Il fait chaud et la mer est belle.', 'It is hot and the sea is beautiful.'], ['Tu veux venir dîner samedi soir ?', 'Do you want to come for dinner on Saturday night?'], ['Rendez-vous à huit heures devant la gare.', 'Meet at eight in front of the station.'], ['Merci pour ton message. À bientôt !', 'Thanks for your message. See you soon!'], ['Bonjour Madame, je voudrais réserver une chambre.', 'Hello Madam, I would like to book a room.']],
  q: [
    ['On a form, “Prénom” means:', 'first name', 'surname|nickname|age', ''],
    ['On a form, “Nom” means:', 'surname', 'first name|number|nationality', ''],
    ['“Date de naissance” means:', 'date of birth', 'today’s date|wedding date|arrival date', ''],
    ['To end a text to a friend:', 'Bisous !', 'Cordialement,|Madame,|Bonjour,', ''],
    ['To end an email to a hotel:', 'Cordialement,', 'Bisous !|Salut !|Coucou !', ''],
    ['Invite a friend:', 'Tu veux venir au cinéma samedi ?', 'Tu viens cinéma samedi.|Vous voulez cinéma ?|Tu veux venir à la cinéma ?', ''],
    ['A postcard from holiday starts:', 'Je suis à Nice avec ma famille.', 'Je suis Nice avec famille.|J’ai à Nice avec ma famille.|Je suis en Nice avec ma famille.', ''],
    ['“Courriel” is:', 'an email address', 'a phone number|a postcode|a job', '']
  ] }
],

DIALOGUES: [
{ id: 'cafe', title: 'At the café', icon: '☕', lines: [
  ['A', 'Bonjour Madame, vous désirez ?', 'Hello Madam, what would you like?'],
  ['B', 'Bonjour. Je voudrais un café et un croissant, s’il vous plaît.', 'Hello. I would like a coffee and a croissant, please.'],
  ['A', 'Un café allongé ou un expresso ?', 'A long coffee or an espresso?'],
  ['B', 'Un expresso. Et une bouteille d’eau aussi.', 'An espresso. And a bottle of water too.'],
  ['A', 'Très bien. Ça fait six euros cinquante.', 'Very good. That’s six euros fifty.'],
  ['B', 'Voilà. Merci, bonne journée !', 'Here you are. Thanks, have a nice day!']],
  q: [['What does the customer order to eat?', 'a croissant', 'a sandwich|a cake|nothing'], ['Which coffee does she choose?', 'an espresso', 'a long coffee|a latte|a tea'], ['What else does she order?', 'a bottle of water', 'a juice|a glass of wine|a second coffee'], ['How much does she pay?', '€6.50', '€5.60|€16.50|€7.50']] },

{ id: 'meet', title: 'Meeting someone', icon: '👋', lines: [
  ['A', 'Salut ! Je m’appelle Léa. Et toi ?', 'Hi! My name is Léa. And you?'],
  ['B', 'Moi, c’est Raj. Enchanté !', 'I’m Raj. Nice to meet you!'],
  ['A', 'Tu es d’où, Raj ?', 'Where are you from, Raj?'],
  ['B', 'Je suis indien, de Bombay. J’habite à Lyon depuis deux mois.', 'I’m Indian, from Mumbai. I have lived in Lyon for two months.'],
  ['A', 'Ah, super ! Qu’est-ce que tu fais ici ?', 'Oh, great! What do you do here?'],
  ['B', 'Je suis étudiant en informatique. Et toi ?', 'I study computer science. And you?'],
  ['A', 'Moi, je travaille dans une banque.', 'I work in a bank.']],
  q: [['Where is Raj from?', 'India', 'France|Italy|Canada'], ['How long has he lived in Lyon?', 'two months', 'two years|two weeks|ten months'], ['What does Raj do?', 'He studies computer science.', 'He works in a bank.|He is a teacher.|He is a cook.'], ['Where does Léa work?', 'in a bank', 'in a school|in a shop|in a hospital']] },

{ id: 'directions', title: 'Asking the way', icon: '🗺️', lines: [
  ['A', 'Excusez-moi, Monsieur. Où est la gare, s’il vous plaît ?', 'Excuse me, sir. Where is the station, please?'],
  ['B', 'La gare ? Allez tout droit, puis prenez la deuxième rue à gauche.', 'The station? Go straight on, then take the second street on the left.'],
  ['A', 'C’est loin ?', 'Is it far?'],
  ['B', 'Non, c’est à dix minutes à pied. La gare est en face de la poste.', 'No, it’s ten minutes on foot. The station is opposite the post office.'],
  ['A', 'Merci beaucoup !', 'Thank you very much!'],
  ['B', 'De rien. Bonne journée !', 'You’re welcome. Have a nice day!']],
  q: [['What is she looking for?', 'the station', 'the post office|a bank|the bus stop'], ['Which street should she take?', 'the second on the left', 'the first on the right|the second on the right|the first on the left'], ['How far is it?', '10 minutes on foot', '10 minutes by bus|2 minutes on foot|20 minutes on foot'], ['What is opposite the station?', 'the post office', 'a café|the bank|a school']] },

{ id: 'bakery', title: 'At the bakery', icon: '🥖', lines: [
  ['A', 'Bonjour ! Qu’est-ce que je vous sers ?', 'Hello! What can I get you?'],
  ['B', 'Bonjour. Deux baguettes et quatre croissants, s’il vous plaît.', 'Hello. Two baguettes and four croissants, please.'],
  ['A', 'Et avec ceci ?', 'Anything else?'],
  ['B', 'C’est combien, la tarte aux pommes ?', 'How much is the apple tart?'],
  ['A', 'Douze euros. Elle est pour six personnes.', 'Twelve euros. It is for six people.'],
  ['B', 'D’accord, je la prends. Je peux payer par carte ?', 'OK, I’ll take it. Can I pay by card?'],
  ['A', 'Oui, bien sûr.', 'Yes, of course.']],
  q: [['How many croissants does he buy?', 'four', 'two|six|twelve'], ['How much is the apple tart?', '€12', '€2|€6|€20'], ['The tart is for how many people?', 'six', 'four|two|twelve'], ['How does he want to pay?', 'by card', 'in cash|by cheque|later']] },

{ id: 'hotel', title: 'At the hotel', icon: '🏨', lines: [
  ['A', 'Bonsoir, j’ai une réservation au nom de Dupont.', 'Good evening, I have a booking in the name of Dupont.'],
  ['B', 'Oui, une chambre double pour trois nuits. C’est bien ça ?', 'Yes, a double room for three nights. Is that right?'],
  ['A', 'Oui. Le petit déjeuner est compris ?', 'Yes. Is breakfast included?'],
  ['B', 'Oui, il est servi de sept heures à dix heures, au rez-de-chaussée.', 'Yes, it is served from seven to ten, on the ground floor.'],
  ['A', 'Parfait. Et il y a le wifi ?', 'Perfect. And is there wifi?'],
  ['B', 'Oui, le code est sur la clé. Votre chambre est au deuxième étage, numéro 24.', 'Yes, the code is on the key. Your room is on the second floor, number 24.']],
  q: [['How many nights is the booking?', 'three', 'two|four|one'], ['When is breakfast served?', '7:00 to 10:00', '6:00 to 9:00|7:00 to 9:30|8:00 to 11:00'], ['Where is the wifi code?', 'on the key', 'at reception|in the room|on the receipt'], ['What is the room number?', '24', '42|22|14']] },

{ id: 'invite', title: 'An invitation', icon: '🎉', lines: [
  ['A', 'Allô, Sophie ? C’est Thomas. Tu es libre samedi soir ?', 'Hello, Sophie? It’s Thomas. Are you free on Saturday evening?'],
  ['B', 'Samedi ? Oui, pourquoi ?', 'Saturday? Yes, why?'],
  ['A', 'C’est mon anniversaire. Je fais une petite fête chez moi. Tu veux venir ?', 'It’s my birthday. I’m having a small party at my place. Do you want to come?'],
  ['B', 'Avec plaisir ! À quelle heure ?', 'With pleasure! At what time?'],
  ['A', 'À partir de vingt heures. J’habite 12 rue Victor Hugo.', 'From eight pm. I live at 12 rue Victor Hugo.'],
  ['B', 'Super. J’apporte un gâteau !', 'Great. I’ll bring a cake!']],
  q: [['Why is Thomas calling?', 'to invite Sophie to his party', 'to cancel a meeting|to ask for directions|to book a table'], ['When is the party?', 'Saturday evening', 'Sunday afternoon|Friday evening|Saturday morning'], ['What time does it start?', '8 pm', '6 pm|9 pm|12 pm'], ['What will Sophie bring?', 'a cake', 'drinks|flowers|a present']] },

{ id: 'doctor', title: 'At the doctor’s', icon: '🩺', lines: [
  ['A', 'Bonjour, qu’est-ce qui ne va pas ?', 'Hello, what’s wrong?'],
  ['B', 'J’ai mal à la tête et j’ai de la fièvre depuis hier.', 'I have a headache and I’ve had a fever since yesterday.'],
  ['A', 'Vous toussez ?', 'Are you coughing?'],
  ['B', 'Oui, un peu. Et je suis très fatigué.', 'Yes, a little. And I’m very tired.'],
  ['A', 'C’est la grippe. Prenez ce médicament trois fois par jour et reposez-vous.', 'It’s the flu. Take this medicine three times a day and rest.'],
  ['B', 'Merci, docteur.', 'Thank you, doctor.']],
  q: [['What hurts?', 'his head', 'his back|his stomach|his leg'], ['Since when does he have a fever?', 'yesterday', 'last week|this morning|three days'], ['What does he have?', 'the flu', 'a cold|nothing serious|a broken arm'], ['How often must he take the medicine?', 'three times a day', 'once a day|twice a day|every hour']] },

{ id: 'sms', title: 'Reading a message', icon: '📱', lines: [
  ['A', 'Coucou Emma ! Je suis au marché avec Lucas.', 'Hi Emma! I am at the market with Lucas.'],
  ['A', 'On achète des fruits et du fromage pour le pique-nique de demain.', 'We are buying fruit and cheese for tomorrow’s picnic.'],
  ['A', 'Rendez-vous à onze heures au parc, devant la fontaine.', 'Meet at eleven at the park, in front of the fountain.'],
  ['A', 'S’il pleut, on mange chez moi. Tu peux apporter des boissons ?', 'If it rains, we eat at my place. Can you bring drinks?'],
  ['A', 'Bisous, Chloé', 'Love, Chloé']],
  q: [['Where is Chloé now?', 'at the market', 'at the park|at home|at work'], ['When is the picnic?', 'tomorrow', 'today|on Sunday|tonight'], ['Where do they meet?', 'in front of the fountain', 'at Chloé’s house|at the market|at the station'], ['What should Emma bring?', 'drinks', 'fruit|cheese|bread']] }
],

// What A1 means (CEFR): what you can do at the end of the level.
CAN_DO: [
  'Introduce yourself and others, and answer simple questions about where you live, people you know and things you have.',
  'Understand familiar words and very basic phrases about yourself, your family and your surroundings when people speak slowly and clearly.',
  'Understand names, numbers, prices, times and dates.',
  'Read short simple texts: signs, posters, catalogues, messages, postcards.',
  'Fill in a form with your details and write a short postcard or message.',
  'Ask and answer simple questions about immediate needs: shopping, directions, food, time.'
]
};

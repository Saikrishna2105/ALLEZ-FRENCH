/*
 * Allez! French – A1 mock exam, modelled on the DELF A1 (France Éducation international):
 * four parts, each out of 25. Pass = 50/100 or more and at least 5/25 in every part.
 *
 * Listening and reading questions: [question, answer, 'wrong|wrong|wrong', points].
 * Listening texts are read by the device voice; `lines` alternate voices A / B.
 */
window.A1_EXAM = {
LISTENING: [
  { title: 'Document 1 · A phone message', minutes: 0, intro: 'You hear a message on your phone.',
    lines: [['A', 'Bonjour Julie, c’est Marc. Samedi soir, on va au cinéma avec Paul et Léa. Tu veux venir ? Le film commence à vingt heures. Rendez-vous à dix-neuf heures trente devant le cinéma Rex, place de la République. Appelle-moi au zéro six, quarante-cinq, douze, soixante-dix-huit, quatre-vingt-dix. À samedi !']],
    q: [['What does Marc suggest?', 'going to the cinema', 'going to a restaurant|playing football|visiting Paul', 2],
        ['When does the film start?', '8 pm', '7:30 pm|8:30 pm|7 pm', 2],
        ['Where do they meet?', 'in front of the cinema', 'at Marc’s house|at the station|in a café', 2],
        ['What is Marc’s number?', '06 45 12 78 90', '06 45 12 68 90|06 55 12 78 90|06 45 02 78 19', 1]] },
  { title: 'Document 2 · In a supermarket', intro: 'You hear an announcement in a supermarket.',
    lines: [['B', 'Chers clients, bonjour ! Aujourd’hui, promotion sur les fruits : le kilo de pommes à un euro cinquante seulement. Au rayon boulangerie, deux baguettes achetées, une baguette offerte. Nous vous rappelons que le magasin ferme ce soir à vingt heures. Merci et bonne journée !']],
    q: [['What is cheaper today?', 'apples', 'oranges|bananas|strawberries', 2],
        ['How much is a kilo?', '€1.50', '€1.15|€5.10|€15', 2],
        ['What time does the shop close tonight?', '8 pm', '10 pm|6 pm|8 am', 2]] },
  { title: 'Document 3 · At the station', intro: 'You hear an announcement at the station.',
    lines: [['A', 'Votre attention, s’il vous plaît. Le train numéro six mille deux cent quatorze à destination de Lyon partira voie trois à quatorze heures vingt-cinq. Attention, ce train a un retard d’environ dix minutes. Nous vous prions de nous excuser.']],
    q: [['Where is the train going?', 'Lyon', 'Lille|Paris|Nice', 2],
        ['Which platform?', '3', '13|2|6', 2],
        ['What is the problem?', 'It is about 10 minutes late.', 'It is cancelled.|It leaves 10 minutes early.|It changes platform.', 2]] },
  { title: 'Document 4 · Two friends', intro: 'Two friends talk about the weekend.',
    lines: [['A', 'Salut Hugo ! Qu’est-ce que tu fais dimanche ?'],
            ['B', 'Je vais à la plage avec ma sœur. Il va faire beau et chaud, vingt-cinq degrés !'],
            ['A', 'Super ! Je peux venir avec vous ?'],
            ['B', 'Bien sûr ! On part à neuf heures, en voiture. Apporte ton maillot de bain et un sandwich.']],
    q: [['Where is Hugo going on Sunday?', 'to the beach', 'to the mountains|to the cinema|to his grandmother’s', 2],
        ['What will the weather be like?', 'sunny and hot', 'rainy|cold and windy|cloudy', 2],
        ['How are they travelling?', 'by car', 'by train|by bus|on foot', 2]] }
],

READING: [
  { title: 'Document 1 · A note', kind: 'note',
    text: 'Salut Antoine !\nJe suis chez ma grand-mère à Bordeaux jusqu’à mardi. Est-ce que tu peux donner à manger à mon chat, Minou, le matin et le soir ? La clé est chez la voisine, Madame Petit, au deuxième étage.\nMerci beaucoup !\nSophie',
    q: [['Where is Sophie?', 'at her grandmother’s', 'at work|on holiday in Spain|at the vet', 2],
        ['Until when?', 'Tuesday', 'Thursday|Sunday|next week', 1],
        ['What must Antoine do?', 'feed the cat', 'water the plants|walk the dog|clean the flat', 2],
        ['Who has the key?', 'the neighbour', 'the grandmother|Antoine|the cat sitter', 1]] },
  { title: 'Document 2 · A poster', kind: 'poster',
    text: 'PISCINE MUNICIPALE\nHoraires :\nLundi : fermé\nMardi → vendredi : 10 h – 20 h\nSamedi et dimanche : 9 h – 18 h\nTarifs : adulte 4 € · enfant (moins de 12 ans) 2 €\nLe bonnet de bain est obligatoire.',
    q: [['When is the pool closed?', 'on Monday', 'on Sunday|on Saturday|every evening', 2],
        ['On Saturday it opens at…', '9 am', '10 am|8 am|6 pm', 1],
        ['How much for a 10-year-old child?', '€2', '€4|€6|free', 2],
        ['What must you wear?', 'a swimming cap', 'sandals|goggles|a T-shirt', 1]] },
  { title: 'Document 3 · A small ad', kind: 'ad',
    text: 'À LOUER\nAppartement 2 pièces, 45 m², centre-ville, près de la gare.\nCuisine équipée, balcon.\n650 € par mois.\nLibre le 1er juin.\nTél. : 01 23 45 67 89 (après 18 h)',
    q: [['What is the ad for?', 'a flat to rent', 'a flat for sale|a room in a hotel|a job', 2],
        ['Where is it?', 'in the town centre, near the station', 'in the countryside|near the beach|next to the airport', 1],
        ['How much is the rent?', '€650 a month', '€560 a month|€650 a week|€45 a month', 2],
        ['When can you call?', 'after 6 pm', 'before 6 pm|only in June|at the weekend', 1]] },
  { title: 'Document 4 · A menu', kind: 'menu',
    text: 'RESTAURANT LE PETIT JARDIN\nMenu du jour : 15 €\nEntrée : salade de tomates ou soupe de légumes\nPlat : poulet rôti avec frites ou poisson avec riz\nDessert : tarte aux pommes ou glace\nBoisson non comprise.\nOuvert tous les jours sauf le dimanche.',
    q: [['What comes with the fish?', 'rice', 'chips|salad|vegetables', 2],
        ['How much is the menu?', '€15', '€5|€50|€16', 2],
        ['Is a drink included?', 'No, it is not.', 'Yes, a glass of wine.|Yes, water only.|Yes, a coffee.', 1],
        ['When is the restaurant closed?', 'on Sunday', 'on Monday|in the evening|never', 1],
        ['Which dessert can you have?', 'apple tart', 'chocolate cake|fruit salad|cheese', 1]] }
],

WRITING: {
  form: {
    intro: 'You are signing up for a French course in Nice. Fill in the form in French. (10 points, 1 per box)',
    fields: [
      ['nom', 'Nom', 'name'], ['prenom', 'Prénom', 'name'], ['nationalite', 'Nationalité', 'nationality'],
      ['naissance', 'Date de naissance', 'date'], ['adresse', 'Adresse', 'address'], ['ville', 'Ville', 'name'],
      ['profession', 'Profession', 'word'], ['langues', 'Langues parlées', 'word'],
      ['raison', 'Pourquoi apprenez-vous le français ?', 'sentence'], ['jours', 'Jours disponibles pour le cours', 'days']
    ]
  },
  message: {
    intro: 'You are on holiday. Write a postcard to a French friend: say where you are, who you are with, what the weather is like and what you do every day. (40 to 50 words, 15 points)',
    model: 'Salut Lucas !\nJe suis en vacances à Nice avec ma famille. Il fait beau et très chaud. Le matin, je vais à la plage avec mon frère. L’après-midi, nous visitons la ville et le soir, nous mangeons au restaurant. C’est super ! Et toi, ça va ?\nBisous,\nSai',
    selfCheck: [['My verbs are conjugated correctly (je suis, nous allons…).', 2], ['My nouns and adjectives agree (une belle plage, il fait chaud).', 2], ['My spelling and accents are mostly right.', 2]]
  }
},

SPEAKING: {
  prep: 'In the real exam you get 10 minutes to prepare, then talk for 5 to 7 minutes with an examiner. Here the app asks the questions; answer out loud. If your browser supports it, tap the microphone and the app writes down what it heard.',
  interview: ['Comment vous appelez-vous ?', 'Quel âge avez-vous ?', 'Où habitez-vous ?', 'Quelle est votre profession ?', 'Vous avez des frères et sœurs ?', 'Qu’est-ce que vous aimez faire le week-end ?'],
  cards: [['Famille ?', 'Vous avez des enfants ?'], ['Sport ?', 'Quel sport est-ce que vous aimez ?'], ['Week-end ?', 'Qu’est-ce que vous faites le week-end ?'], ['Cinéma ?', 'Vous allez souvent au cinéma ?'], ['Travail ?', 'Où est-ce que vous travaillez ?'], ['Petit déjeuner ?', 'Qu’est-ce que vous mangez au petit déjeuner ?']],
  roleplay: {
    task: 'You are in a clothes shop. You want to buy a jumper for a friend. Ask the price, the size and the colours, choose one, and pay.',
    phrases: ['Bonjour, je cherche un pull pour un ami.', 'Il coûte combien ?', 'Vous avez la taille M ?', 'Il existe en bleu ?', 'Je le prends.', 'Je peux payer par carte ?', 'Merci, au revoir !']
  },
  // Official DELF A1 speaking grid (25 points).
  grid: [['Part 1 · I answered the personal questions in short sentences.', 4], ['Part 2 · I asked a correct question for each card.', 4], ['Part 3 · I asked for the price, size and colour, and paid politely.', 7], ['Vocabulary · I had the words I needed.', 3], ['Grammar · My sentences were mostly correct.', 3], ['Pronunciation · I spoke clearly enough to be understood.', 4]]
}
};

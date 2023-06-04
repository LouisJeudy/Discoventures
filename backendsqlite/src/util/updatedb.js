const placesModel = require('../models/places.js')
const routeModel = require('../models/routes.js')
// eslint-disable-next-line no-unused-vars
const routesPlacesModel = require('../models/routesPlaces.js')
const routeUserVoteModel = require('../models/routesUsersVote.js')
const userModel = require('../models/users.js')

const bcrypt = require('bcrypt');
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  const passhashAdmin = await bcrypt.hash('#S3cREt.', 2)
  const passhashLambda = await bcrypt.hash('%P4ssW0rd', 2)

  // One admin and three users
  await userModel.create({
    username: 'SuperAdmin',
    email: 'superadmin@email.com',
    password: passhashAdmin,
    isadmin: true
  })
  await userModel.create({
    username: 'Mickey',
    email: 'mickey@email.com',
    password: passhashLambda,
    isadmin: false
  })
  await userModel.create({
    username: 'Minnie',
    email: 'minnie@email.com',
    password: passhashLambda,
    isadmin: false
  })
  await userModel.create({
    username: 'Donald',
    email: 'donald@email.com',
    password: passhashLambda,
    isadmin: false
  })
  // Create several places for routes

  const p1 = await placesModel.create({
    title: 'Bibliothèque Gabriel Peri',
    description: '<p><b>Gabriel Péri</b>, né le <time class="nowrap date-lien bday" datetime="1902-02-09" data-sort-value="1902-02-09">9 février 1902</time> à Toulon et mort pour la France le <time class="nowrap date-lien dday" datetime="1941-12-15" data-sort-value="1941-12-15">15 décembre 1941</time> au Mont-Valérien (Suresnes), est un journaliste et homme politique français. Membre du Comité central du Parti communiste français, responsable du service de politique étrangère de <i>L\'Humanité</i> et député de Seine-et-Oise, il fut arrêté comme résistant par la police française et fusillé comme otage par les Allemands au fort du Mont-Valérien.</p>',
    longitude: 5.754786,
    latitude: 45.188956
  })
  const p2 = await placesModel.create({
    title: 'Commune de Saint-Martin-d`\'Hères - Pôle Archives',
    description: '<p><b>Échirolles</b> est une commune française située dans le département de l\'Isère, en région Auvergne-Rhône-Alpes. </p><p>La commune compte 36 932 habitants au <time class="nowrap" datetime="2019-01-01" data-sort-value="2019-01-01"><abbr class="abbr" title="premier">1<sup>er</sup></abbr> janvier 2019</time>, se positionnant avec Saint-Martin-d\'Hères comme l\'une des deux principales villes de la banlieue de Grenoble, au sud de celle-ci. C\'est une ville à fort caractère urbain, dont un centre n\'a été développé que vers la fin du <abbr class="abbr" title="20ᵉ siècle"><span>XX</span><sup style="font-size:72%">e</sup></abbr> siècle. </p><p>Ses habitants sont appelés les Échirollois.</p>',
    longitude: 5.755813,
    latitude: 45.183476
  })
  const p3 = await placesModel.create({
    title: 'CDCN : l\'Atelier de Paris',
    description: '"<p>Le <b>Théâtre de l\'Aquarium</b> est installé sur le site de La Cartoucherie dans le bois de Vincennes dans le <abbr class="abbr" title="Douzième">12<sup>e</sup></abbr> arrondissement de Paris. Il jouxte les autres théâtres de La Cartoucherie : le Théâtre du Soleil, le Théâtre de la Tempête, le Théâtre de l\'Épée de Bois et l\'Atelier de Paris / CDCN.</p>',
    longitude: 2.449079,
    latitude: 48.834716
  })
  const p4 = await placesModel.create({
    title: 'Parc de Bagatelle',
    description: '<p>Le <b>parc de Bagatelle</b> est un parc situé dans le <abbr class="abbr" title="Seizième">16<sup>e</sup></abbr> arrondissement de Paris (France), en bordure de la pelouse (dite aussi « plaine de jeux ») de Bagatelle, dans le bois de Boulogne. Proche de la limite sud de la commune de Neuilly-sur-Seine, il est l\'un des quatre pôles du Jardin botanique de la ville de Paris avec le jardin des serres d\'Auteuil situé au sud-est du bois, ainsi que le parc floral de Paris et l\'arboretum de l\'école du Breuil, eux dans le bois de Vincennes.</p>',
    longitude: 2.451513,
    latitude: 48.829859
  })
  const p5 = await placesModel.create({
    title: 'Bibliothèque Scientifique dite Bibliothèque du Campus Universitaire de Saint-Martin-d\'Hères',
    description: '<p>La <b>Presqu\'île de Grenoble</b>, également dénommée <b>polygone scientifique</b> selon un usage plus ancien, est un quartier de Grenoble d\'une superficie de <span title="2 500 000 m² ou 2,5 km²">250</span> hectares situé le plus au nord de la ville, caractérisé par la présence de nombreux centres de recherche scientifique. </p><p>Ce quartier fait l\'objet depuis 2011 d\'un remodelage urbain de grande envergure portant le nom de Grenoble Presqu\'île et visant à en faire un quartier ordinaire, mais aussi le second campus de Grenoble appelé <b>GIANT</b> (Grenoble Innovation for Advanced New Technologies), en complément du domaine universitaire. </p>',
    longitude: 5.765774,
    latitude: 45.194197
  })
  const p6 = await placesModel.create({
    title: 'Centre de gestion de la fonction publique territoriale de l\'Isère - Service Archives Itinérantes',
    description: '<p><b>Fontaine</b> (<i>Fontana</i> en francoprovençal ou arpitan) est une commune française située dans le département de l\'Isère en région Auvergne-Rhône-Alpes. La commune, également située dans l\'aire urbaine de Grenoble, est également adhérente de Grenoble-Alpes Métropole, depuis la création de ce qui fut tout d\'abord communauté d\'agglomération, puis une métropole. </p><p>En 2021, la commune de Fontaine, reste très densément peuplée. Son territoire est situé dans la banlieue immédiate de la ville de Grenoble, dont elle n\'est séparée, à l\'est, que par le cours du grand torrent alpin, le Drac. Son identité urbaine et humaine est marquée par l’héritage de l’industrie et de la présence d\'une population modeste, constituée essentiellement d\'ouvriers, d\'employés et leurs familles, ainsi que de retraités, issus de ces mêmes classes professionnelles.',
    longitude: 5.769429,
    latitude: 45.187798
  })
  const p7 = await placesModel.create({
    title: 'Médiathèque du Bachut',
    description: '<p><b>Le Bachut</b> est un quartier de la ville de Lyon situé dans le <abbr class="abbr" title="Huitième">8<sup>e</sup></abbr> arrondissement. </p><p>Il est traversé par l\'avenue Berthelot et la rue Marius Berliet. Desservi par le tramway, il est relié à la Presqu\'île, à l\'hôpital Édouard-Herriot et au campus de Bron. En mai 2007 a été inaugurée la médiathèque du Bachut, baptisée Médiathèque Marguerite Duras, située place du <time class="nowrap" datetime="1918-11-11" data-sort-value="1918-11-11">11 novembre 1918</time>. La mairie du <abbr class="abbr" title="Huitième">8<sup>e</sup></abbr> arrondissement et la Maison de la Danse complètent l\'activité. </p>',
    longitude: 4.868152,
    latitude: 45.737171
  })
  const p8 = await placesModel.create({
    title: 'Monument Aux Morts Italiens',
    description: '<p>Un <b>monument aux morts</b> est un monument érigé pour commémorer et honorer les soldats, et plus généralement les personnes tuées ou disparues par faits de guerre. </p><p>Il en existe de plusieurs types : </p> <ul><li>les cénotaphes (monuments mortuaires n’abritant aucun corps), généralement dans le centre d\'une ville ou d\'un village, mais qui ont aussi été, après la Première Guerre mondiale, élevés dans les entreprises, les écoles, les foyers fréquentés par les disparus de leur vivant ;</li> <li>les mémoriaux, monuments nationaux élevés sur les champs de bataille (par exemple, à Douaumont, en France) où les cimetières militaires abritent les tombes de soldats, parfois de centaines de milliers d\'entre eux.</li></ul>',
    longitude: 4.870122,
    latitude: 45.734046
  })
  const p9 = await placesModel.create({
    title: 'Monument À La Gloire du Service de Santé Militaire',
    description: '<p>Le <b>monument à la gloire du service de santé militaire de Grange Blanche</b> est un monument situé dans le <abbr class="abbr" title="Huitième">8<sup>e</sup></abbr> arrondissement de Lyon qui commémore l\'action des soldats médecins issus de l\'École de santé des armées lors des conflits du <abbr class="abbr" title="20ᵉ siècle"><span>XX</span><sup style="font-size:72%">e</sup></abbr> siècle. </p>',
    longitude: 4.878471,
    latitude: 45.742696
  })
  // Each lambda uses have a private and a public route

  const r1 = await routeModel.create({
    title: 'Visite rapide de Saint-Martin-d\'Hères',
    coordinates: {
      data: {
        latitude: [
          45.186589, 45.186627, 45.18672, 45.186812, 45.186587, 45.186556,
          45.186537, 45.186568, 45.187009, 45.187078, 45.187069, 45.18689,
          45.18695, 45.187014, 45.187041, 45.187057, 45.18713, 45.187203,
          45.187288, 45.187331, 45.187376, 45.187541, 45.187739, 45.187761,
          45.187758, 45.18777, 45.187847, 45.187916, 45.188016, 45.188042,
          45.18809, 45.188186, 45.188482, 45.188702, 45.188834, 45.188937,
          45.188834, 45.188702, 45.188482, 45.188464, 45.188424, 45.188319,
          45.188179, 45.187833, 45.187766, 45.187714, 45.187538, 45.187358,
          45.187243, 45.187203, 45.18713, 45.187057, 45.187041, 45.187014,
          45.18695, 45.18689, 45.186283, 45.186051, 45.185898, 45.185006,
          45.184997, 45.184983, 45.184957, 45.18493, 45.18485, 45.184733,
          45.184128, 45.184098, 45.183967, 45.18389, 45.183725, 45.183527,
          45.183484, 45.183527, 45.183725, 45.18389, 45.183967, 45.184098,
          45.184128, 45.184733, 45.18485, 45.18493, 45.184957, 45.184983,
          45.184997, 45.185006, 45.185154, 45.185442, 45.185606, 45.185689,
          45.185746, 45.185946, 45.186285, 45.186405, 45.186487, 45.186515,
          45.186537, 45.186556, 45.186587, 45.186812, 45.18672, 45.186627,
          45.186589
        ],
        longitude: [
          5.754958, 5.754892, 5.754727, 5.754566, 5.754276, 5.754236,
          5.754211, 5.754102, 5.754649, 5.754734, 5.754772, 5.755493,
          5.755523, 5.755554, 5.755568, 5.755576, 5.755612, 5.755648,
          5.755231, 5.755223, 5.755187, 5.755304, 5.754765, 5.754705,
          5.754556, 5.754527, 5.754353, 5.75424, 5.7541, 5.754065,
          5.754146, 5.75426, 5.754489, 5.75466, 5.754759, 5.754837,
          5.754759, 5.75466, 5.754489, 5.754536, 5.75464, 5.754929,
          5.755319, 5.756227, 5.756294, 5.756241, 5.756064, 5.755912,
          5.755733, 5.755648, 5.755612, 5.755576, 5.755568, 5.755554,
          5.755523, 5.755493, 5.755191, 5.755067, 5.754984, 5.754496,
          5.754549, 5.754593, 5.754685, 5.754784, 5.754741, 5.754677,
          5.754337, 5.754323, 5.754271, 5.754311, 5.754909, 5.755639,
          5.755793, 5.755639, 5.754909, 5.754311, 5.754271, 5.754323,
          5.754337, 5.754677, 5.754741, 5.754784, 5.754685, 5.754593,
          5.754549, 5.754496, 5.753903, 5.75405, 5.754044, 5.75404,
          5.754037, 5.754021, 5.753994, 5.754088, 5.75417, 5.754193,
          5.754211, 5.754236, 5.754276, 5.754566, 5.754727, 5.754892,
          5.754958
        ]
      }
    },
    estimatedDistance: 1962.436,
    estimatedTime: 1395.834,
    activityType: 'walk',
    userId: 2,
    isPrivate: false
  })
  r1.addPlace(p1)
  r1.addPlace(p2)
  const r2 = await routeModel.create({
    title: 'Ma balade quotidienne à Paris',
    coordinates: {
      data: {
        latitude: [
          48.833432, 48.833496, 48.833501, 48.833557, 48.83361,
          48.833728, 48.83374, 48.833755, 48.833792, 48.833897,
          48.833966, 48.83404, 48.834131, 48.834187, 48.834206,
          48.834201, 48.834291, 48.83432, 48.834352, 48.834389,
          48.834386, 48.834526, 48.834568, 48.834649, 48.834696,
          48.834732, 48.834688, 48.834732, 48.834696, 48.834649,
          48.834568, 48.834526, 48.834386, 48.834389, 48.834352,
          48.83432, 48.834291, 48.834201, 48.834206, 48.834187,
          48.834131, 48.83404, 48.833966, 48.833897, 48.833792,
          48.833755, 48.833699, 48.83363, 48.833569, 48.833499,
          48.8334, 48.833252, 48.833124, 48.832493, 48.831869,
          48.831326, 48.830589, 48.829492, 48.829564, 48.829603,
          48.829659, 48.82969, 48.829924, 48.829944, 48.830349,
          48.830374, 48.830401, 48.830422, 48.830446, 48.830474,
          48.83051, 48.830536, 48.830573, 48.830631, 48.830741,
          48.831174, 48.831213, 48.831538, 48.831686, 48.83183,
          48.832018, 48.832221, 48.832341, 48.832494, 48.83263,
          48.832833, 48.83286, 48.833121, 48.833342, 48.833432
        ],
        longitude: [
          2.448166, 2.447634, 2.447592, 2.447111, 2.446649, 2.446687,
          2.446565, 2.446433, 2.446474, 2.446507, 2.446518, 2.446796,
          2.446997, 2.447276, 2.447448, 2.447632, 2.447898, 2.448109,
          2.448238, 2.448654, 2.448956, 2.44941, 2.449356, 2.449303,
          2.449291, 2.449273, 2.449095, 2.449273, 2.449291, 2.449303,
          2.449356, 2.44941, 2.448956, 2.448654, 2.448238, 2.448109,
          2.447898, 2.447632, 2.447448, 2.447276, 2.446997, 2.446796,
          2.446518, 2.446507, 2.446474, 2.446433, 2.446369, 2.446322,
          2.446302, 2.44633, 2.44633, 2.446366, 2.446429, 2.447376,
          2.448208, 2.448937, 2.449892, 2.451324, 2.451544, 2.451653,
          2.451697, 2.451749, 2.452135, 2.452106, 2.451548, 2.451526,
          2.451513, 2.451512, 2.45152, 2.451532, 2.45156, 2.451587,
          2.451619, 2.451714, 2.451894, 2.452606, 2.452553, 2.452109,
          2.451906, 2.451707, 2.451484, 2.451163, 2.450997, 2.450784,
          2.450594, 2.450313, 2.450276, 2.45071, 2.44891, 2.448166
        ]
      }
    },
    estimatedDistance: 2092.129,
    estimatedTime: 1515.787,
    activityType: 'walk',
    userId: 2,
    isPrivate: true
  })
  r2.addPlace(p3)
  r2.addPlace(p4)
  const r3 = await routeModel.create(
    {
      title: 'Marche digestive sur le campus SMH',
      coordinates: {
        data: {
          latitude: [
            45.193291, 45.19331, 45.193499, 45.19371, 45.193702, 45.1937,
            45.193686, 45.193778, 45.193997, 45.194026, 45.194147, 45.194129,
            45.194126, 45.194124, 45.194109, 45.194093, 45.19406, 45.194034,
            45.194105, 45.194132, 45.194184, 45.194181, 45.194184, 45.194132,
            45.194105, 45.194034, 45.19406, 45.194093, 45.194109, 45.194124,
            45.194126, 45.194129, 45.194015, 45.194026, 45.193997, 45.193778,
            45.193686, 45.193605, 45.193269, 45.193166, 45.193078, 45.193058,
            45.193032, 45.192979, 45.192949, 45.192927, 45.192906, 45.192694,
            45.192615, 45.192384, 45.192057, 45.191932, 45.191789, 45.191732,
            45.191677, 45.191634, 45.191562, 45.191523, 45.191477, 45.191384,
            45.191301, 45.190886, 45.190377, 45.189665, 45.189176, 45.189001,
            45.188946, 45.188911, 45.188897, 45.188878, 45.188856, 45.188832,
            45.18881, 45.18879, 45.188776, 45.188676, 45.188658, 45.188523,
            45.188313, 45.188127, 45.187802, 45.188127, 45.188313, 45.188523,
            45.188681, 45.188736, 45.188778, 45.188793, 45.188813, 45.188835,
            45.188858, 45.188876, 45.188892, 45.188905, 45.189004, 45.189176,
            45.189665, 45.190377, 45.190886, 45.191301, 45.191384, 45.191477,
            45.191523, 45.191562, 45.191634, 45.191677, 45.191732, 45.191789,
            45.191932, 45.192057, 45.192384, 45.192615, 45.192694, 45.192906,
            45.192927, 45.192949, 45.192979, 45.193032, 45.193046, 45.19309,
            45.19312, 45.193129, 45.193332, 45.19331, 45.193291
          ],
          longitude: [
            5.76841, 5.768718, 5.768435, 5.768137, 5.768021, 5.767992, 5.767804,
            5.767791, 5.76776, 5.767757, 5.767742, 5.76747, 5.767424, 5.767383,
            5.767008, 5.766769, 5.766238, 5.765834, 5.765824, 5.765821, 5.765815,
            5.765776, 5.765815, 5.765821, 5.765824, 5.765834, 5.766238, 5.766769,
            5.767008, 5.767383, 5.767424, 5.76747, 5.76749, 5.767757, 5.76776,
            5.767791, 5.767804, 5.767815, 5.767863, 5.76788, 5.767906, 5.767909,
            5.767912, 5.76792, 5.767924, 5.767926, 5.767929, 5.767771, 5.767944,
            5.768455, 5.768659, 5.768737, 5.768993, 5.769062, 5.769073, 5.769091,
            5.769138, 5.769101, 5.769071, 5.769059, 5.769067, 5.769121, 5.76918,
            5.769265, 5.769325, 5.769328, 5.769334, 5.769339, 5.769312, 5.769293,
            5.769283, 5.769282, 5.769291, 5.769309, 5.769335, 5.769357, 5.769361,
            5.769395, 5.769423, 5.769447, 5.76949, 5.769447, 5.769423, 5.769395,
            5.769434, 5.769444, 5.769453, 5.769477, 5.769494, 5.769502, 5.7695,
            5.769492, 5.769477, 5.769458, 5.769401, 5.769325, 5.769265, 5.76918,
            5.769121, 5.769067, 5.769059, 5.769071, 5.769101, 5.769138, 5.769091,
            5.769073, 5.769062, 5.768993, 5.768737, 5.768659, 5.768455, 5.767944,
            5.767771, 5.767929, 5.767926, 5.767924, 5.76792, 5.767912, 5.768107,
            5.768904, 5.768901, 5.769071, 5.769051, 5.768718, 5.76841
          ]
        }
      },
      estimatedDistance: 2100.799,
      estimatedTime: 1487.819,
      activityType: 'run',
      userId: 3,
      isPrivate: false
    }
  )
  r3.addPlace(p5)
  r3.addPlace(p6)
  const r4 = await routeModel.create(
    {
      title: 'Courir après les cours d\'ENSIMAG',
      coordinates: {
        data: {
          latitude: [
            45.193291, 45.19331, 45.193499, 45.19371, 45.193702, 45.1937,
            45.193686, 45.193778, 45.193997, 45.194026, 45.194147, 45.194129,
            45.194126, 45.194124, 45.194109, 45.194093, 45.19406, 45.194034,
            45.194105, 45.194132, 45.194184, 45.194181, 45.194184, 45.194132,
            45.194105, 45.194034, 45.19406, 45.194093, 45.194109, 45.194124,
            45.194126, 45.194129, 45.194015, 45.194026, 45.193997, 45.193778,
            45.193686, 45.193605, 45.193269, 45.193166, 45.193078, 45.193058,
            45.193032, 45.192979, 45.192949, 45.192927, 45.192906, 45.192694,
            45.192615, 45.192384, 45.192057, 45.191932, 45.191789, 45.191732,
            45.191677, 45.191634, 45.191562, 45.191523, 45.191477, 45.191384,
            45.191301, 45.190886, 45.190377, 45.189665, 45.189176, 45.189001,
            45.188946, 45.188911, 45.188897, 45.188878, 45.188856, 45.188832,
            45.18881, 45.18879, 45.188776, 45.188676, 45.188658, 45.188523,
            45.188313, 45.188127, 45.187802, 45.188127, 45.188313, 45.188523,
            45.188681, 45.188736, 45.188778, 45.188793, 45.188813, 45.188835,
            45.188858, 45.188876, 45.188892, 45.188905, 45.189004, 45.189176,
            45.189665, 45.190377, 45.190886, 45.191301, 45.191384, 45.191477,
            45.191523, 45.191562, 45.191634, 45.191677, 45.191732, 45.191789,
            45.191932, 45.192057, 45.192384, 45.192615, 45.192694, 45.192906,
            45.192927, 45.192949, 45.192979, 45.193032, 45.193046, 45.19309,
            45.19312, 45.193129, 45.193332, 45.19331, 45.193291
          ],
          longitude: [
            5.76841, 5.768718, 5.768435, 5.768137, 5.768021, 5.767992, 5.767804,
            5.767791, 5.76776, 5.767757, 5.767742, 5.76747, 5.767424, 5.767383,
            5.767008, 5.766769, 5.766238, 5.765834, 5.765824, 5.765821, 5.765815,
            5.765776, 5.765815, 5.765821, 5.765824, 5.765834, 5.766238, 5.766769,
            5.767008, 5.767383, 5.767424, 5.76747, 5.76749, 5.767757, 5.76776,
            5.767791, 5.767804, 5.767815, 5.767863, 5.76788, 5.767906, 5.767909,
            5.767912, 5.76792, 5.767924, 5.767926, 5.767929, 5.767771, 5.767944,
            5.768455, 5.768659, 5.768737, 5.768993, 5.769062, 5.769073, 5.769091,
            5.769138, 5.769101, 5.769071, 5.769059, 5.769067, 5.769121, 5.76918,
            5.769265, 5.769325, 5.769328, 5.769334, 5.769339, 5.769312, 5.769293,
            5.769283, 5.769282, 5.769291, 5.769309, 5.769335, 5.769357, 5.769361,
            5.769395, 5.769423, 5.769447, 5.76949, 5.769447, 5.769423, 5.769395,
            5.769434, 5.769444, 5.769453, 5.769477, 5.769494, 5.769502, 5.7695,
            5.769492, 5.769477, 5.769458, 5.769401, 5.769325, 5.769265, 5.76918,
            5.769121, 5.769067, 5.769059, 5.769071, 5.769101, 5.769138, 5.769091,
            5.769073, 5.769062, 5.768993, 5.768737, 5.768659, 5.768455, 5.767944,
            5.767771, 5.767929, 5.767926, 5.767924, 5.76792, 5.767912, 5.768107,
            5.768904, 5.768901, 5.769071, 5.769051, 5.768718, 5.76841
          ]
        }
      },
      estimatedDistance: 2100.799,
      estimatedTime: 991,
      activityType: 'run',
      userId: 3,
      isPrivate: true
    }
  )
  r4.addPlace(p5)
  r4.addPlace(p6)
  const r5 = await routeModel.create(
    {
      title: 'Course de vélo sur le campus',
      coordinates: {
        data: {
          latitude: [
            45.193291, 45.19331, 45.193499, 45.19371, 45.193702, 45.1937,
            45.193686, 45.193778, 45.193997, 45.194026, 45.194147, 45.194129,
            45.194126, 45.194124, 45.194109, 45.194093, 45.19406, 45.194034,
            45.194105, 45.194132, 45.194184, 45.194181, 45.194184, 45.194132,
            45.194105, 45.194034, 45.19406, 45.194093, 45.194109, 45.194124,
            45.194126, 45.194129, 45.194015, 45.194026, 45.193997, 45.193778,
            45.193686, 45.193605, 45.193269, 45.193166, 45.193078, 45.193058,
            45.193032, 45.192979, 45.192949, 45.192927, 45.192906, 45.192694,
            45.192615, 45.192384, 45.192057, 45.191932, 45.191789, 45.191732,
            45.191677, 45.191634, 45.191562, 45.191523, 45.191477, 45.191384,
            45.191301, 45.190886, 45.190377, 45.189665, 45.189176, 45.189001,
            45.188946, 45.188911, 45.188897, 45.188878, 45.188856, 45.188832,
            45.18881, 45.18879, 45.188776, 45.188676, 45.188658, 45.188523,
            45.188313, 45.188127, 45.187802, 45.188127, 45.188313, 45.188523,
            45.188681, 45.188736, 45.188778, 45.188793, 45.188813, 45.188835,
            45.188858, 45.188876, 45.188892, 45.188905, 45.189004, 45.189176,
            45.189665, 45.190377, 45.190886, 45.191301, 45.191384, 45.191477,
            45.191523, 45.191562, 45.191634, 45.191677, 45.191732, 45.191789,
            45.191932, 45.192057, 45.192384, 45.192615, 45.192694, 45.192906,
            45.192927, 45.192949, 45.192979, 45.193032, 45.193046, 45.19309,
            45.19312, 45.193129, 45.193332, 45.19331, 45.193291
          ],
          longitude: [
            5.76841, 5.768718, 5.768435, 5.768137, 5.768021, 5.767992, 5.767804,
            5.767791, 5.76776, 5.767757, 5.767742, 5.76747, 5.767424, 5.767383,
            5.767008, 5.766769, 5.766238, 5.765834, 5.765824, 5.765821, 5.765815,
            5.765776, 5.765815, 5.765821, 5.765824, 5.765834, 5.766238, 5.766769,
            5.767008, 5.767383, 5.767424, 5.76747, 5.76749, 5.767757, 5.76776,
            5.767791, 5.767804, 5.767815, 5.767863, 5.76788, 5.767906, 5.767909,
            5.767912, 5.76792, 5.767924, 5.767926, 5.767929, 5.767771, 5.767944,
            5.768455, 5.768659, 5.768737, 5.768993, 5.769062, 5.769073, 5.769091,
            5.769138, 5.769101, 5.769071, 5.769059, 5.769067, 5.769121, 5.76918,
            5.769265, 5.769325, 5.769328, 5.769334, 5.769339, 5.769312, 5.769293,
            5.769283, 5.769282, 5.769291, 5.769309, 5.769335, 5.769357, 5.769361,
            5.769395, 5.769423, 5.769447, 5.76949, 5.769447, 5.769423, 5.769395,
            5.769434, 5.769444, 5.769453, 5.769477, 5.769494, 5.769502, 5.7695,
            5.769492, 5.769477, 5.769458, 5.769401, 5.769325, 5.769265, 5.76918,
            5.769121, 5.769067, 5.769059, 5.769071, 5.769101, 5.769138, 5.769091,
            5.769073, 5.769062, 5.768993, 5.768737, 5.768659, 5.768455, 5.767944,
            5.767771, 5.767929, 5.767926, 5.767924, 5.76792, 5.767912, 5.768107,
            5.768904, 5.768901, 5.769071, 5.769051, 5.768718, 5.76841
          ]
        }
      },
      estimatedDistance: 2073.4,
      estimatedTime: 794.4,
      activityType: 'bike',
      userId: 4,
      isPrivate: true
    }
  )
  r5.addPlace(p5)
  r5.addPlace(p6)
  const r6 = await routeModel.create(
    {
      title: 'Beauté lyonnaise',
      coordinates: {
        data: {
          latitude: [
            45.738082, 45.738023, 45.73798, 45.737936, 45.73788, 45.737864, 45.737851,
            45.737941, 45.737966, 45.737998, 45.73803, 45.738052, 45.738059, 45.738065,
            45.738071, 45.738075, 45.738048, 45.738014, 45.737971, 45.736626, 45.736591,
            45.736599, 45.73656, 45.736538, 45.736587, 45.736647, 45.736835, 45.737214,
            45.737132, 45.737214, 45.736835, 45.736647, 45.736587, 45.736538, 45.736514,
            45.736497, 45.736449, 45.736404, 45.736289, 45.736111, 45.73604, 45.735992,
            45.735955, 45.735922, 45.735555, 45.735314, 45.734641, 45.734487, 45.734113,
            45.734023, 45.734113, 45.734487, 45.734641, 45.734661, 45.7347, 45.734719,
            45.734726, 45.734717, 45.735396, 45.735459, 45.735555, 45.735573, 45.735657,
            45.736152, 45.736172, 45.736212, 45.73623, 45.736246, 45.736315, 45.736369,
            45.736397, 45.736474, 45.73649, 45.736514, 45.736611, 45.736646, 45.737869,
            45.737897, 45.737969, 45.738052, 45.738518, 45.738649, 45.738862, 45.739214,
            45.739387, 45.739436, 45.739735, 45.739773, 45.73985, 45.739927, 45.74031,
            45.740544, 45.74074, 45.740766, 45.740869, 45.740953, 45.741275, 45.741597,
            45.742137, 45.742177, 45.74226, 45.742563, 45.742634, 45.742697, 45.742718,
            45.742681, 45.742718, 45.742759, 45.742726, 45.742411, 45.742378, 45.742339,
            45.742274, 45.742044, 45.741171, 45.741118, 45.741027, 45.740918, 45.740817,
            45.740411, 45.74021, 45.740179, 45.740138, 45.740064, 45.739969, 45.739917,
            45.73985, 45.739773, 45.739735, 45.739436, 45.739387, 45.739214, 45.738862,
            45.738649, 45.738518, 45.738488, 45.738482, 45.73845, 45.738414, 45.738317,
            45.738223, 45.738149, 45.738144, 45.738155, 45.738082
          ],
          longitude: [
            4.872569, 4.872556, 4.872572, 4.872541, 4.872506, 4.8725, 4.872495,
            4.872019, 4.872006, 4.871816, 4.871783, 4.871708, 4.871649, 4.871596,
            4.871552, 4.871461, 4.871411, 4.87135, 4.871315, 4.869498, 4.869408,
            4.869312, 4.869247, 4.86923, 4.86913, 4.869015, 4.868814, 4.868347,
            4.868196, 4.868347, 4.868814, 4.869015, 4.86913, 4.86923, 4.869217,
            4.869185, 4.869151, 4.869112, 4.869351, 4.869499, 4.869556, 4.869493,
            4.869555, 4.869673, 4.869999, 4.870218, 4.870788, 4.87084, 4.87028,
            4.870157, 4.87028, 4.87084, 4.870788, 4.870834, 4.870922, 4.870964,
            4.870985, 4.871032, 4.870404, 4.870349, 4.870267, 4.870251, 4.870249,
            4.869785, 4.869792, 4.869698, 4.869731, 4.869741, 4.869782, 4.869806,
            4.869781, 4.869715, 4.869683, 4.869636, 4.869764, 4.869812, 4.871464,
            4.871503, 4.8716, 4.871708, 4.872317, 4.872488, 4.872773, 4.873234,
            4.873468, 4.873558, 4.873956, 4.874011, 4.874126, 4.874239, 4.874804,
            4.87514, 4.875419, 4.875455, 4.875595, 4.875705, 4.876158, 4.876625,
            4.877412, 4.877468, 4.877577, 4.878012, 4.878117, 4.878206, 4.87824,
            4.878466, 4.87824, 4.878038, 4.877994, 4.877552, 4.877505, 4.87743,
            4.87733, 4.877001, 4.875752, 4.875677, 4.875549, 4.875383, 4.875232,
            4.874656, 4.874366, 4.874321, 4.87424, 4.87414, 4.87413, 4.874128,
            4.874126, 4.874011, 4.873956, 4.873558, 4.873468, 4.873234, 4.872773,
            4.872488, 4.872317, 4.872414, 4.872432, 4.872597, 4.872826, 4.872908,
            4.872933, 4.872828, 4.872738, 4.872608, 4.872569
          ]
        }
      },
      estimatedDistance: 3074.097,
      estimatedTime: 2242.456,
      activityType: 'walk',
      userId: 4,
      isPrivate: false
    }
  )
  r6.addPlace(p7)
  r6.addPlace(p8)
  r6.addPlace(p9)
  await routeUserVoteModel.create(
    {
      routeId: 6,
      userId: 4,
      note: 4
    }
  )
  await routeUserVoteModel.create(
    {
      routeId: 3,
      userId: 4,
      note: 2
    }
  )
})()

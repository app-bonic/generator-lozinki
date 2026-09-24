// Popis čestih hrvatskih riječi za fraze (duplikati se uklanjaju pri učitavanju)
window.RIJECI = [...new Set(`
more rijeka jezero otok obala planina brdo dolina polje šuma livada stijena pijesak kamen zemlja nebo oblak kiša snijeg vjetar
sunce mjesec zvijezda zora sumrak noć jutro podne večer tjedan godina proljeće ljeto jesen zima potok izvor slap špilja uvala
kuća stan soba kuhinja prozor vrata krov zid stol stolica krevet ormar polica lampa svijeća ogledalo tepih zavjesa jastuk deka
sat ključ brava ograda vrt dvorište staza most cesta ulica trg grad selo luka svjetionik mlin toranj crkva škola knjižnica
muzej kazalište kino tržnica pekara ljekarna pošta banka tvrđava dvorac palača zdenac fontana klupa park
jabuka kruška šljiva trešnja višnja breskva marelica smokva grožđe limun naranča mandarina banana ananas jagoda malina kupina
borovnica lubenica dinja rajčica paprika krastavac mrkva krumpir češnjak kupus salata grašak grah kukuruz tjestenina kruh
pogača kolač pita krafna palačinka juha gulaš sarma sir mlijeko jogurt maslac med džem čaj kava sok vino sol papar šećer
brašno ulje ocat jaje orah badem lješnjak kesten riža zob ječam pšenica
pas mačka konj krava ovca koza zec lisica vuk medvjed jelen srna vjeverica jež miš sova orao golub vrabac lastavica galeb
patka guska kokoš pijetao labud roda riba pastrva tuna dupin kit rak školjka hobotnica puž leptir pčela mrav bubamara pauk
žaba kornjača gušter sokol jastreb papiga lav tigar slon žirafa zebra majmun deva pingvin tuljan los bizon ris kuna vidra
crven plav zelen žut bijel crn siv smeđ ljubičast narančast ružičast zlatan srebrn
velik malen visok nizak dug kratak širok uzak brz spor jak lagan topao hladan svjež star mlad nov lijep drag sretan veseo
tih glasan miran hrabar pametan mudar vrijedan dobar sladak slan kiseo gorak mekan tvrd gladak oštar okrugao ravan sjajan
tajni čudan vedar tamni svijetao bistar čist snažan nježan ponosan skroman vjeran budan pospan gladan žedan
knjiga olovka papir bilježnica pismo karta kompas torba kofer šešir kapa šal rukavica čizma cipela čarapa kaput jakna
košulja haljina suknja hlače remen gumb džep kišobran naočale prsten lanac narukvica novčanik kutija vreća košara
gitara bubanj violina truba flauta klavir harmonika tambura pjesma ples glazba slika kist platno kip priča bajka zagonetka
igra lopta šah kocka slagalica zmaj balon kolo bicikl romobil auto kamion autobus vlak tramvaj brod jedro čamac veslo
avion helikopter raketa sidro jarbol kormilo
alat čekić pila bušilica šaraf čavao metar ljestve kanta lopata grablje kosilica traktor plug zrno sjeme cvijet ruža tulipan
ljiljan lavanda ružmarin bosiljak kadulja metvica hrast bor jela smreka bukva lipa javor breza vrba topola maslina loza palma
kaktus mahovina paprat gljiva trska list grana korijen deblo pupoljak
prijatelj susjed obitelj majka otac brat sestra baka djed teta ujak dijete beba kum gost putnik ribar pekar kovač mornar
pilot vozač liječnik učitelj kuhar vrtlar slikar pjesnik pisac glumac pjevač svirač sudac čuvar lovac pastir
glava ruka noga oko uho nos usta zub kosa srce leđa rame koljeno lakat prst dlan obrva trepavica
zlato srebro bakar željezo staklo drvo svila vuna pamuk koža mramor granit kristal biser dijamant rubin smaragd
sjever jug istok zapad
jedan dva tri četiri pet šest sedam osam devet deset sto tisuća
vatra dim iskra plamen led para rosa magla duga munja grom oluja val plima oseka struja
radost mir sreća nada ljubav snaga hrabrost mudrost znanje ideja san misao osmijeh smijeh pozdrav poklon iznenađenje
putovanje izlet odmor praznik rođendan zabava sajam koncert utakmica pobjeda cilj put karta mapa
kompjutor ekran tipkovnica telefon kamera radio televizor baterija žarulja utičnica kabel
subota nedjelja ponedjeljak utorak srijeda četvrtak petak siječanj veljača ožujak travanj svibanj lipanj srpanj kolovoz rujan listopad studeni prosinac
jadran dunav sava drava kupa krka cetina neretva velebit biokovo učka dinara medvednica papuk
zagreb split rijeka osijek zadar pula šibenik dubrovnik karlovac varaždin sisak vukovar čakovec koprivnica bjelovar požega gospić makarska rovinj poreč
`.trim().split(/\s+/))];

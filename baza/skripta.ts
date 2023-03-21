var db = connect('127.0.0.1:27017/radionica2023');

/******* kolekcija korisnici *******/
db.korisnici.insert(
{
  "ime": "Jovica",
  "prezime": "Dobric",
  "korisnickoIme": "jovica",
  "lozinka": "Jovica123#",
  "lozinkaTrajeDo": -1,
  "mejl": "jovicaperic84@gmail.com",
  "tip": "administrator",
  "status": "aktivan",
  "telefon": "+381 66 5080121",
  "slika": "jovica1.jpg",
  "nazivOrganizacije": "",
  "adresaOrganizacije": "",
  "maticniBrojOrganizacije": "",
  "radionice": [],
  "skice": []
});

db.korisnici.insert(
{
  "ime": "Ana",
  "prezime": "Jovic",
  "korisnickoIme": "ana",
  "lozinka": "Ana1234#",
  "lozinkaTrajeDo": -1,
  "mejl": "jovicana36@gmail.com",
  "tip": "organizator",
  "status": "aktivan",
  "telefon": "+381 66 4010255",
  "slika": "ana2.jpg",
  "nazivOrganizacije": "Feniks",
  "adresaOrganizacije": "Kralja Petra 10, Beograd",
  "maticniBrojOrganizacije": "0809998182321",
  "radionice": [],
  "skice": [
    "Radionica crtanja1.json",
    "Mozaik3.json"
  ]
});

db.korisnici.insert(
{
  "ime": "Lazar",
  "prezime": "Mikic",
  "korisnickoIme": "lazar",
  "lozinka": "Lazar123#",
  "lozinkaTrajeDo": -1,
  "mejl": "lazzarmikic@gmail.com",
  "tip": "organizator",
  "status": "aktivan",
  "telefon": "+381 66 7232444",
  "slika": "lazar3.jpg",
  "nazivOrganizacije": "Zanateria",
  "adresaOrganizacije": "Cara Dusana 8, Beograd",
  "maticniBrojOrganizacije": "0503993189873",
  "radionice": [],
  "skice": []
});

db.korisnici.insert(
{
  "ime": "Filip",
  "prezime": "Kojic",
  "korisnickoIme": "filip",
  "lozinka": "Filip123#",
  "lozinkaTrajeDo": -1,
  "mejl": "filipkojic48@gmail.com",
  "tip": "ucesnik",
  "status": "aktivan",
  "telefon": "+381 66 5080929",
  "slika": "filip4.jpg",
  "nazivOrganizacije": "",
  "adresaOrganizacije": "",
  "maticniBrojOrganizacije": "",
  "radionice": [
    1,
    2,
    3,
    4,
    6
  ],
  "skice": []
});

db.korisnici.insert(
{
  "ime": "Gordana",
  "prezime": "Sekulic",
  "korisnickoIme": "gordana",
  "lozinka": "Gordana123#",
  "lozinkaTrajeDo": -1,
  "mejl": "gordanasek@gmail.com",
  "tip": "ucesnik",
  "status": "aktivan",
  "telefon": "+381 66 8050312",
  "slika": "gordana5.jpg",
  "nazivOrganizacije": "",
  "adresaOrganizacije": "",
  "maticniBrojOrganizacije": "",
  "radionice": [
    1,
    2,
    3,
    5
  ],
  "skice": []
});

db.korisnici.insert(
{
  "ime": "Milan",
  "prezime": "Jokic",
  "korisnickoIme": "milan",
  "lozinka": "Milan123#",
  "lozinkaTrajeDo": -1,
  "mejl": "mjokic324@gmail.com",
  "tip": "ucesnik",
  "status": "aktivan",
  "telefon": "+381 66 7323888",
  "slika": "milan6.jpg",
  "nazivOrganizacije": "",
  "adresaOrganizacije": "",
  "maticniBrojOrganizacije": "",
  "radionice": [
    1,
    3,
    4,
    5
  ],
  "skice": []
});

db.korisnici.insert(
{
  "ime": "Milica",
  "prezime": "Petrovic",
  "korisnickoIme": "milica",
  "lozinka": "Milica123#",
  "lozinkaTrajeDo": -1,
  "mejl": "milpetrovic22@gmail.com",
  "tip": "ucesnik",
  "status": "aktivan",
  "telefon": "+381 66 4748124",
  "slika": "milica7.jpg",
  "nazivOrganizacije": "",
  "adresaOrganizacije": "",
  "maticniBrojOrganizacije": "",
  "radionice": [
    1,
    2,
    5,
    6
  ],
  "skice": []
});

/******* kolekcija radionice *******/
db.radionice.insert(
{
  "id": 1,
  "naziv": "Radionica crtanja",
  "status": "zavrsena",
  "organizator": "ana",
  "kapacitet": 6,
  "glavnaSlika": "1crtanjeGlavna.jpg",
  "datum": 1675987200000,
  "mesto": "Beograd",
  "adresa": "Dunavski kej 19, Beograd",
  "kratakOpis": "Naša škola crtanja i slikanja za odrasle je namenjena svima koji žele da se opuste, nauče osnovne slikarske tehnike i razviju svoju kreativnost. Polaznici imaju priliku da se upoznaju sa osnovama crtanja i slikanja, kao i da svoje znanje konstantno unapređuju.",
  "dugOpis": "Mnogi se ne odlučuju za slikanje usled visoke cene materijala odnosno alata za slikanje. Ipak, naša škola slikanja za odrasle obezbeđuje sav potreban materijal za slikanje, pa ne morate razmišljati o tome kada se uputite kod nas.\nNa raspolaganju ćete imati sav alat koji koristimo, od profesionalnih četkica različite mekoće i veličine, preko vrhunskih olovaka i uglja, pa sve do platna i boja svih vrsta.\nPristup naših edukatora je takav da se slikarstvo za početnike može prilagoditi svakom početniku ponaosob. Sasvim je u redu da su različiti ljudi na različitom stepenu poznavanja tehnika crtanja ili slikanja, kao i to da nemaju prethodnog iskustva. Prema optimalnom planu realizacije programa – garantovana je posvećenost naših umetnika-edukatora, koji će vas voditi kroz kreativni, stilski i tehnički proces slikarstva i crtanja.",
  "slike": [
    "1crtanje-1.jpg",
    "1crtanje-2.jpg",
    "1crtanje-3.jpg",
    "1crtanje-4.jpg",
    "1crtanje-5.jpg"
  ],
  "svidjanja": [
    "filip",
    "gordana",
    "milan",
    "milica"
  ],
  "cekajuNa": [],
  "komentari": [
    {
      "idK": 1,
      "korisnik": "filip",
      "vreme": 1675956707413,
      "tekst": "Fantasticna radionica."
    },
    {
      "idK": 2,
      "korisnik": "gordana",
      "vreme": 1675956775344,
      "tekst": "Sjajna organizacija, sve preporuke."
    },
    {
      "idK": 3,
      "korisnik": "milica",
      "vreme": 1675956854338,
      "tekst": "Odlicno"
    }
  ],
  "prijavljeni": [
    "filip",
    "gordana",
    "milan",
    "milica"
  ]
});

db.radionice.insert(
{
  "id": 2,
  "naziv": "Slikanje na staklu",
  "status": "zavrsena",
  "organizator": "lazar",
  "kapacitet": 4,
  "glavnaSlika": "2slikanjeGlavna.jpg",
  "datum": 1676073600000,
  "mesto": "Novi Sad",
  "adresa": "Majevicka 22, Novi Sad",
  "kratakOpis": "Ne treba vam poseban talenat za slikanje kako biste napravili unikatne predmete koji će zadiviti Vas, Vašu porodicu i prijatelje. Slikanje na staklu je vrsta umetnosti kojom svako može ulepšati svoj dom ili radni prostor.",
  "dugOpis": "Slikanje na staklu je hobi u kojem će uživati svi oko Vas. Vi ćete uživati dok stvarate, Vaša porodica će biti zadivljena unikatnim ukrasima u svom domu, a prijatelji će se oduševiti kada od Vas dobiju poklon od srca koji ste napravili baš za njih.\nBićete u mogućnosti da izražavate i negujete svoju kreativnost kroz slikanje na staklu flase, boce, čaše ili bilo kog drugog staklenog objekta. Zamislite period praznika i sve te božićne šablone za crtanje na staklu koje ćete umeti da nacrtate.\nPrijavite se i napravite prvi korak ka jednostavnom i brzom uređenju svog životnog prostora.",
  "slike": [
    "2slikanje-1.jpg",
    "2slikanje-2.jpg",
    "2slikanje-3.jpg",
    "2slikanje-4.jpg",
    "2slikanje-5.jpg"
  ],
  "svidjanja": [
    "filip",
    "milica",
    "gordana"
  ],
  "cekajuNa": [],
  "komentari": [
    {
      "idK": 1,
      "korisnik": "filip",
      "vreme": 1675962024128,
      "tekst": "Sve pohvale!"
    },
    {
      "idK": 2,
      "korisnik": "milica",
      "vreme": 1675962259790,
      "tekst": "Jako zabavno, nadam se slicnoj radionici uskoro."
    }
  ],
  "prijavljeni": [
    "filip",
    "gordana",
    "milica"
  ]
});

db.radionice.insert(
{
  "id": 3,
  "naziv": "Mozaik",
  "status": "zavrsena",
  "organizator": "ana",
  "kapacitet": 2,
  "glavnaSlika": "3mozaikGlavna.png",
  "datum": 1676160000000,
  "mesto": "Novi Sad",
  "adresa": "Radnicka 4, Novi Sad",
  "kratakOpis": "Svima koji žele da naprave nešto predivno za svoj dom, baštu ili unikatan poklon za dragu osobu. Onima koji žele da nauče nov zanimljiv hobi koji će pozitivno uticati na oslobađanje sopstvene kreativnosti. Svima koji žele da iskažu svoje misli kroz umetnost u zanmljivom i prijateljskom okruženju.",
  "dugOpis": "Mozaik je umetnost stvaranja slike sklapanjem malih delova obojenog stakla, kamena, ili drugih materijala. Najraniji poznati primeri mozaika izrađenih od različitih materijala su pronađeni u hramu u Mesopotamiji i potiču iz druge polovine trećeg milenijuma pne. Sastoje se od komadića kamenja, školjki i slonovače.\nMozaici iz 4. veka pne pronađeni su u makedonskoj palati Egae i oni se ukrasili podove helenističkih vila i rimskih kuća. Zapanjujući podovi od mozaika se mogu naći u rimskim vilama širom severne Afrike, u mestima kao što je Kartagina, i još uvek se može videti velika kolekcija u Bardo muzeju u Tunisu.Mozaik predstavlja jednu od najstarijih tehnika umetničkog izražavanja, a tajne izrade u ovoj tehnici su poznavali još stari Vavilonci, razvijali je Grci, unapređivali Rimljani, da bi se danas izučavao u celom svetu. Kroz sve vekove svog postojanja, mozaik je predstavljao jednu od najprestižnijih umetničkih rukotvorina. Zašto je ne biste naučili uz nas?",
  "slike": [
    "3mozaik-1.png",
    "3mozaik-2.png",
    "3mozaik-3.png",
    "3mozaik-4.png",
    "3mozaik-5.png"
  ],
  "svidjanja": [
    "milan",
    "filip",
    "gordana"
  ],
  "cekajuNa": [],
  "komentari": [
    {
      "idK": 1,
      "korisnik": "milan",
      "vreme": 1675963449232,
      "tekst": "Lepo zamisljeno i odradjeno"
    },
    {
      "idK": 2,
      "korisnik": "filip",
      "vreme": 1675963496625,
      "tekst": "Interesantna tema"
    },
    {
      "idK": 3,
      "korisnik": "gordana",
      "vreme": 1675963528523,
      "tekst": "Pridruzujem se pohvalama :)"
    }
  ],
  "prijavljeni": [
    "filip",
    "milan",
    "gordana"
  ]
});

db.radionice.insert(
{
  "id": 4,
  "naziv": "Dekupaz",
  "status": "zavrsena",
  "organizator": "lazar",
  "kapacitet": 13,
  "glavnaSlika": "4dekupazGlavna.jpg",
  "datum": 1676246400000,
  "mesto": "Kragujevac",
  "adresa": "Kumanovska 4, Kragujevac",
  "kratakOpis": "Dekupaž tehnika je tehnika kojojm svaki predmet možete da pretvorite u Vaše malo umetničko delo. Možda se ne slažu svi da je dekupaž umetnost, ali jeste delo Vaših ruku koje ćete Vi gledati i diviti mu se, za Vas će to biti čista umetnost. S obzirom na to da je dekupaž veoma zanimljiva aktivnost, jedan čas učenja ove tehnike, u našoj radionici podrazumeva tri sata rada.",
  "dugOpis": "Mnogi ne znaju, ali dekupaž tehnika je zapravo metod dekoracije nameštaja upotrebom neuobičajenog repromaterijala kao što su salvete, drveni predmeti, lepak i boje. Pored novih, kompleksnih vrsta\nVerovali ili ne istorija dekupaža seže daleko u istoriju, čak do 12. veka u Aziji, iako su prvi popularni vidovi dekupaž tehnike vezani za 17. vek i orijentalne radove istočnjačkih umetnika.\nReč dekupaž vodi poreklo iz francuskog jezika – “Découpage” – i najbolje objašnjava ono što dekupaž tehnika zaista znači. Dekupaž znači “Izrezati” ili “iseći” nešto, što objašnjava tehniku seckanja ukrasnog papira sa različitim motivima kako bi se sjedinili sa predmetom koji želimo da dekorišemo.\n\nOvo potvrđuje i istorijsku činjenicu da su umetnici iz Venecije želeli da imitiraju proces izrade predmeta koji je potekao iz Azije, tako što će na jeftiniji način izrezati slike i lepiti ih na nameštaj. Ekonomska strana priče vam je sigurno jasna, ali uprkos tome, tako je nastala dekupaž tehnika kojom se danas rado bavimo u okviru Beo Art House dekupaž radionice.",
  "slike": [
    "4dekupaz-1.jpg",
    "4dekupaz-2.jpg",
    "4dekupaz-3.jpg",
    "4dekupaz-4.jpg",
    "4dekupaz-5.jpg"
  ],
  "svidjanja": [
    "filip",
    "milan"
  ],
  "cekajuNa": [],
  "komentari": [
    {
      "idK": 1,
      "korisnik": "milan",
      "vreme": 1675964634798,
      "tekst": "Super, nadam se da cete ponovo organizovati nesto slicno."
    }
  ],
  "prijavljeni": [
    "milan",
    "filip"
  ]
});

db.radionice.insert(
{
  "id": 5,
  "naziv": "Kaligrafija",
  "status": "zavrsena",
  "organizator": "ana",
  "kapacitet": 9,
  "glavnaSlika": "5kaligrafijaGlavna.jpg",
  "datum": 1676332800000,
  "mesto": "Subotica",
  "adresa": "Vuka Karadzica 18, Subotica",
  "kratakOpis": "Kurs kaligrafije tj. krasnopisa je namenjen svima koji žele “da savladaju tehnike lepog pisanja a istovremeno nauče novu i zanimljivu veštinu. Jedan „čas“ traje 90 minuta, a celokupan kurs kaligrafije podrazumeva 4 dolaska što je više nego dovoljno da svake nedelje naučite mnoštvo novih stvari, uz utvrđivanje prethodno stečenih veština.",
  "dugOpis": "Moderna kaligrafijase definiše kao umetnost davanja forme slovnim znacima na virtuozan način i koristi se za kreiranje fontova, čestitki, pozivnica, diploma i dokumenata.\nKaligrafija slova se pišu na pergamentu, papirusu i papiru a za to se koriste različite vrste alata – od četke preko markera i pera (od trske, bambusa, ptičija) pa sve do flomastera posebno zarezanih za kaligrafsko pisanje.\nBez obzira na prethodno iskustvo u bavljenju likovnim i primenjenim umetnostima, škola kaligrafije je dostupna svim osobama koje imaju želju da duhovno i kreativno napreduju kroz ovu umetnost.\nImaćete prilike da se upoznate sa osnovama kaligrafije, prisustvujete časovima praktičnih vežbi pisanja slova i tekstova i na kraju ćete izraditi samostalno umetničko delo.",
  "slike": [
    "5kaligrafija-1.jpg",
    "5kaligrafija-2.png",
    "5kaligrafija-3.png",
    "5kaligrafija-4.png"
  ],
  "svidjanja": [
    "milan"
  ],
  "cekajuNa": [],
  "komentari": [
    {
      "idK": 1,
      "korisnik": "milica",
      "vreme": 1675965507879,
      "tekst": "Sve preporuke!"
    },
    {
      "idK": 2,
      "korisnik": "gordana",
      "vreme": 1675965537152,
      "tekst": "Sjajno!"
    }
  ],
  "prijavljeni": [
    "gordana",
    "milica",
    "milan"
  ]
});

db.radionice.insert(
{
  "id": 6,
  "naziv": "Vajanje",
  "status": "zavrsena",
  "organizator": "lazar",
  "kapacitet": 8,
  "glavnaSlika": "6vajanjeGlavna.jpg",
  "datum": 1676419200000,
  "mesto": "Beograd",
  "adresa": "Trg Republike 3, Beograd",
  "kratakOpis": "Ovaj kurs vajarstva od četiri časa je uzbudljiva mogućnost za početnike, kao i za one sa prethodnim iskustvom, da nauče šta je vajarstvo i steknu ili razviju osnovne vajarske veštine. Kroz rad sa glinom i gipsom, naučićete niz tehnika uz priliku da istražite svoju kreativnost. Kako biste savladali tehnike vajanja, jedan čas vajanja podrazumeva tri sata rada.",
  "dugOpis": "Vajarstvo je jedan od najfinijih oblika likovne umetnosti poznate čoveku, imalo je glavnu ulogu u evoluciji zapadne kulture. Njegova istorija i stilski razvoj je zapravo razvoj same zapadne umetnosti. Ono je ključni pokazatelj kulturnih dostignuća klasične antike, i imalo je važan uticaj na razvoj renesanse u Italiji. Zajedno sa arhitekturom, vajarstvo je bilo glavni oblik monumentalne religiozne umetnosti koja je vekovima (od V do XIX) bila pokretačka snaga evropske civilizacije. Čak i danas, iako se konstantno razvija, vajarstvo i dalje jeste vodeći način izražavanja i obeležavanja događaja i istorijskih ličnosti.\n\nTokom svoje istorije, ono je privuklo neke od najvećih umetnika ikada, uključujući i klasične vajare kao što Fidias, Miron od Eleutreje, Poliklitos, Skopas, Lisip, Praksitel i Leokares, kao i Donatelo (1386-1466), Mikelanđelo (1475-1654), Điambolonja (1529-1608), veliki Bernini (1598-1680), Ogist Roden (1840-1917), Henri Mur (1898-1986), Pikaso (1881-1973), Konstantin Brankuši (1876-1957), i Damien Herst (b.1965).\n\nVrhunski primerci ovog dugo ustaljenog oblika umetnosti mogu se naći u mnogim spektakularnim umetničkim muzejima širom sveta, pa i kod nas, baš kao što i vi možete naučiti kako se vaja uz nase radionice vajarstva u Beogradu.",
  "slike": [
    "6vajanje-1.jpg",
    "6vajanje-2.jpg",
    "6vajanje-3.jpg",
    "6vajanje-4.jpg"
  ],
  "svidjanja": [],
  "cekajuNa": [],
  "komentari": [],
  "prijavljeni": [
    "filip",
    "milica"
  ]
});

db.radionice.insert(
{
  "id": 7,
  "naziv": "Ikonopis",
  "status": "aktivna",
  "organizator": "ana",
  "kapacitet": 0,
  "glavnaSlika": "7ikonopisGlavna.jpg",
  "datum": 1677628800000,
  "mesto": "Beograd",
  "adresa": "Kralja Petra 9, Beograd ",
  "kratakOpis": "Kroz ikonopis za početnike i kvalitetno provedeno vreme u radionicama uz druženje u veseloj atmosferi, polaznici stiču teorijsko i praktično znanje, upoznaju celokupan proces oslikavanja ikona na raznim materijalima i podlogama, i stiču mogućnost da svoja dostignuća prezentuju u okviru stalne postavke radova polaznika nasih radionica.",
  "dugOpis": "Kurs ikonopisanja je namenjen svim zainteresovanim osobama sa sklonošću ka likovnom izražavanju, koje imaju želju da duhovno i kreativno napreduju kroz ikonopisanje, bez obzira na njihovo prethodno iskustvo u bavljenju likovnim i primenjenim umetnostima.\nKurs se sastoji iz praktičnog i teorijskog dela. U teorijskom delu kursa naučićete nešto više o hrišćanskoj ikonografiji, značaju ikona, stilovima ikonografije, pripremanju podloge, preparaciji i impregnaciji daske, prenošenju crteža, izradi pozlate, podslikavanju i samom oslikavanju ikona, kao i o finalnom lakiranju i zaštiti gotove ikone.\nU praktičnom delu radićemo sa pigmentima i jajčanim temperama, pozlatom, prenošenjem crteža i procesom oslikavanja. Kada se budete dovoljno uvežbali na lakšim podlogama, počećete sa radom na slikanju ikone na drvetu, koja nakon kursa ostaje u Vašem vlasništvu ili biva izložena u  okviru stalne postavke radova polaznika radionice.",
  "slike": [
    "7ikonopis-1.jpg",
    "7ikonopis-2.jpg",
    "7ikonopis-3.jpg",
    "7ikonopis-4.jpg"
  ],
  "svidjanja": [],
  "cekajuNa": [
    "milan"
  ],
  "komentari": [],
  "prijavljeni": [
    "filip",
    "gordana"
  ]
});

db.radionice.insert(
{
  "id": 8,
  "naziv": "Maketarstvo",
  "status": "aktivna",
  "organizator": "ana",
  "kapacitet": 2,
  "glavnaSlika": "8maketarstvoGlavna.png",
  "datum": 1677715200000,
  "mesto": "Novi Sad",
  "adresa": "Majurska 1, Novi Sad",
  "kratakOpis": "Maketarstvo je specifična profesija, ali i hobi, kojim se bave kreativni ljudi, čija mašta i vešte ruke pretaču stvarnost u minijaturu. Postoji od davnina i uvek se smatralo da je za to potreban poseban dar. Uz dovoljno truda i pomoć Beo Art House maketara svojim rukama ćete stvoriti fantastične kreacije.",
  "dugOpis": "Maketarstvo kao hobi predstavlja izradu minijaturnih replika raznovrsnih predmeta koji su po svojoj prirodi znatno veći. Naravno da svima odmah na pamet padnu makete automobila, ali maketarstvo je nastalo znatno ranije i ima različite primene. Mnogi ga poistovećuju sa modeliranjem i ako u svojoj osnovi jesu različite stavke.\nMaketarstvo vuče korene još iz antičkog doba. Čovek je oduvek želeo da pripitomi prirodu i svet oko sebe, pa je odlučio da je učini “manjom” od sebe. Mnogi rimski i grčki građevinari i arhitekte su koristili tehnike srazmernog modeliranja ne bi li napravili modele budućih gradova i fascinantnih projekata. Nekada je kreiranje minijaturnih predmeta isključivo bilo profesija, a potom je vremenom maketarstvo postalo uzbudljiv hobi.\nTako je otpočela izrada modela i maketa. Najpre su korišćeni isključivo prirodni materijali, kada plastika nije ni postojala, a potom se prešlo i na druge, čovekom stvorene materijale poput plastike, stakla, ogledala i tkanina.",
  "slike": [
    "8maketarstvo-1.png",
    "8maketarstvo-2.png",
    "8maketarstvo-3.png",
    "8maketarstvo-4.png"
  ],
  "svidjanja": [],
  "cekajuNa": [],
  "komentari": [],
  "prijavljeni": [
    "filip",
    "gordana",
    "milan"
  ]
});

db.radionice.insert(
{
  "id": 9,
  "naziv": "Slikanje na tekstilu",
  "status": "aktivna",
  "organizator": "lazar",
  "kapacitet": 10,
  "glavnaSlika": "9tekstilGlavna.jpg",
  "datum": 1677801600000,
  "mesto": "Smederevo",
  "adresa": "Kneza Mihaila 14, Smederevo",
  "kratakOpis": "Slikanje na tekstilu je veoma kreativna aktivnost, koja će probuditi vašu maštu. Polaznici kursa slikanja na tekstilu će se najpre upoznati sa osnovama ove vrste slikanja, a kasnije će doći i do nivoa kada će moći da naprave svoje unikatne kreacije. Jedan kurs slikanja na tekstilu traje 4h, što će biti sjajan način da steknete nova znanja ili utvrdite prethodno stečene veštine.",
  "dugOpis": "Batik je stari metod slikanja na tekstilu koji se koristio u Africi, istočnoj Aziji i Srednjem istoku. Ovaj metod može da se primeni na svili, pamuku, vuni, pa čak i koži. Pri korišćenju ovog metoda koristite topli vosak, i pređete četkicom onuda kuda ne želite da se boja zadrži.\nNakon toga, prelazite na delove koje ćelite da obojite, i idete od najsvetlijih tonova ka tamniim. Kada obojite svoj dizajn ostavite ga od 12-48 sati da odstoji, i da se lepo osuši. Onda dodajte još jedan sloj voska i bolje. Ovaj proces ponavljate za svaku boju koju koristite. Kada završite sa bojenjem, uklonite sav vosak, i vaša odeća je spremna.Oprema koja vam je potrebna za crtanje po tekstilu je prilično jednostavna, i lako je možete naći u kući ili radnji. Alat je obezbeđen za sve polaznike kursa Beo Art Hosue-a, vaše je samo da dođete, opustite se, i pustite mašti na volju.",
  "slike": [
    "9tekstil-1.jpg",
    "9tekstil-2.jpg",
    "9tekstil-3.jpg",
    "9tekstil-4.jpg"
  ],
  "svidjanja": [],
  "cekajuNa": [],
  "komentari": [],
  "prijavljeni": []
});

db.radionice.insert(
{
  "id": 10,
  "naziv": "Dekupaz",
  "status": "aktivna",
  "organizator": "lazar",
  "kapacitet": 10,
  "glavnaSlika": "10dekupazGlavna.jpg",
  "datum": 1677888000000,
  "mesto": "Beograd",
  "adresa": "Kneza Milosa 4, Beograd",
  "kratakOpis": "Reč dekupaž vodi poreklo iz francuskog jezika – “Découpage” – i najbolje objašnjava ono što dekupaž tehnika zaista znači. Dekupaž znači “Izrezati” ili “iseći” nešto, što objašnjava tehniku seckanja ukrasnog papira sa različitim motivima kako bi se sjedinili sa predmetom koji želimo da dekorišemo.",
  "dugOpis": "Dekupaž tehnika je tehnika kojojm svaki predmet možete da pretvorite u Vaše malo umetničko delo. Možda se ne slažu svi da je dekupaž umetnost, ali jeste delo Vaših ruku koje ćete Vi gledati i diviti mu se, za Vas će to biti čista umetnost. S obzirom na to da je dekupaž veoma zanimljiva aktivnost, jedan čas učenja ove tehnike, u našoj radionici podrazumeva tri sata rada.\nOve tehnike dekupaža daju širinu u pogledu stila, tako da istom tehnikom mozete napraviti romantičnu kutiju (ili bilo koji drugi predmet), vintage kutije, moderne i svedene, svetle ili tamne, zavisno od vaših ličnih afiniteta. Kroz dekupaž radionice polaznici savladavaju rad sa bojama, patinama, pastama, šablonima, pečatima i mnogim drugim materijalima…\nDekupaž (sa svim izvedenim i kombinovnim tehnikama) je pre svega uživanje, druženje, istraživanje i stvaranje personalizovanih predmeta koje možete upotrebljavati ili poklanjati, a ispunjavaju Vašu ili dušu onih kojima je poklon namenjen.",
  "slike": [
    "10dekupaz-1.jpg",
    "10dekupaz-2.jpg",
    "10dekupaz-3.jpg",
    "10dekupaz-4.jpg"
  ],
  "svidjanja": [],
  "cekajuNa": [],
  "komentari": [],
  "prijavljeni": []
});

/******* kolekcija cetovi *******/
db.chats.insert(
{
  "korisnik1": "filip",
  "korisnik2": "ana",
  "radionicaId": 1,
  "radionicaNaziv": "Radionica crtanja",
  "poruke": [
    {
      "autor": "filip",
      "tekst": "Pozdrav, zainteresovan sam za ovu radionicu.Mozete li mi reci u koliko sati pocinje?",
      "vreme": 1675955730007
    },
    {
      "autor": "ana",
      "tekst": "Pozdrav Filipe, radionica pocinje u 14h i traje 3 sata.",
      "vreme": 1675956235080
    },
    {
      "autor": "ana",
      "tekst": "Vidimo see :)",
      "vreme": 1675956250803
    },
    {
      "autor": "filip",
      "tekst": "Hvala na brzom odgovoru. Vidimo see",
      "vreme": 1675956549109
    }
  ]
});

db.chats.insert(
{
  "korisnik1": "gordana",
  "korisnik2": "ana",
  "radionicaId": 1,
  "radionicaNaziv": "Radionica crtanja",
  "poruke": [
    {
      "autor": "gordana",
      "tekst": "Zdravo, da li materijal donosimo sami ili je obezbedjen?",
      "vreme": 1675955975576
    },
    {
      "autor": "ana",
      "tekst": "Zdravo, materijal je obezbedjen. Hvala na interesovanju :)",
      "vreme": 1675956305129
    },
    {
      "autor": "ana",
      "tekst": "Vidimo se sutraa",
      "vreme": 1675956312512
    }
  ]
});

db.chats.insert(
{
  "korisnik1": "filip",
  "korisnik2": "lazar",
  "radionicaId": 2,
  "radionicaNaziv": "Slikanje na staklu",
  "poruke": [
    {
      "autor": "filip",
      "tekst": "Zdravo, koliko traje ova radionica?",
      "vreme": 1675961465802
    },
    {
      "autor": "lazar",
      "tekst": "Cao, radionica traje 4 sata.",
      "vreme": 1675962078576
    }
  ]
});

db.chats.insert(
{
  "korisnik1": "milica",
  "korisnik2": "lazar",
  "radionicaId": 2,
  "radionicaNaziv": "Slikanje na staklu",
  "poruke": [
    {
      "autor": "milica",
      "tekst": "Pozdrav, da li ima pauza u toku trajanja radionice?",
      "vreme": 1675961700616
    },
    {
      "autor": "lazar",
      "tekst": "Zdravo Milice, nakon 2 sata imamo pauzu od 20 minuta.",
      "vreme": 1675962122493
    }
  ]
});

db.chats.insert(
{
  "korisnik1": "milan",
  "korisnik2": "ana",
  "radionicaId": 3,
  "radionicaNaziv": "Mozaik",
  "poruke": [
    {
      "autor": "milan",
      "tekst": "Cao, da li mi donosimo materijal?",
      "vreme": 1675963162159
    },
    {
      "autor": "ana",
      "tekst": "Cao Milane, mi donosimo sve sto je potrebno za radionicu.",
      "vreme": 1675963325690
    },
    {
      "autor": "ana",
      "tekst": "Hvala na interesovanju i prijavi :)",
      "vreme": 1675963357664
    }
  ]
});

db.chats.insert(
{
  "korisnik1": "milan",
  "korisnik2": "lazar",
  "radionicaId": 4,
  "radionicaNaziv": "Dekupaz",
  "poruke": [
    {
      "autor": "milan",
      "tekst": "Zdravo, kojim linijama se najlakse dolazi do vase lokacije",
      "vreme": 1675964299808
    },
    {
      "autor": "lazar",
      "tekst": "Milane, linije 36 i 37 staju preko puta zgrade u kojoj se odrzava radionica.",
      "vreme": 1675964510507
    }
  ]
});

db.chats.insert(
{
  "korisnik1": "milica",
  "korisnik2": "lazar",
  "radionicaId": 4,
  "radionicaNaziv": "Dekupaz",
  "poruke": [
    {
      "autor": "milica",
      "tekst": "Pozdrav, da li je u planu slicna radionica u buducnosti? Nisam u mogucnosti da prisustvujem trenutnoj.",
      "vreme": 1675964424598
    },
    {
      "autor": "lazar",
      "tekst": "Cao Milice, verovatno cemo nesto slicno organizovati ponovo u skorijem vremenskom intervalu.Pozdrav :)",
      "vreme": 1675964548576
    }
  ]
});




















<b>GRUPA 1085 - IANCU CRISTINA & GLEJARU COSTIN</b>

<h1>Aplicatie web pentru acordarea de feedback continuu</h1>
<h2>Aspecte arhitecturale</h2>
Acest proiect are ca obiectiv realizarea unei aplicații web pentru acordarea de feedback continuu unei activitati (un curs sau seminar). Arhitectura va fi de tip Single Page Application accesibilă în browser de pe desktop, dispozitive mobile sau tablete (in functie de preferințele utilizatorului).
Front-end-ul SPA va fi realizat cu ajutorul unui framework bazat pe componente, in React.js. Back-end-ul va avea o interfață REST și va fi realizat în node.js Stocarea se va face peste o bază relațională (SQLite) și accesul la baza se va face prin intermediul unui ORM (unui API de persistenţă și date expuse de un serviciu extern).

<h2>Principala nevoie pe care o solutioneaza aplicatia noastra</h2>
Feedback-ul ar trebui sa fie considerat unul dintre ingredientele cheie pentru fructificarea relatiei universitare dintre actori. Incorporarea acestuia in cadrul activitatilor educationale imbunatateste comunicarea dintre studenti si profesori, creand un mediu interactiv si mult mai eficient, bazat pe actiune si reactiune.
Scopul acestei solutii informatice este de a oferi posibilitatea acordarii de feedback continuu si anonim, necesar in imbunatatirea calitatea muncii si a interactiunii profesor-student in cadrul unei universitati. Astfel, profesorii vor tine evidenta permanenta a impactului si performantei materiei asupra studentilor prin posibilitatea acestora de a-si exprima opinia in mod secret, fara a suporta consecinte negative. 

<h2>Utilizatorii carora i se adreseaza aplicatia</h2>
Aplicatia se adreseaza ambelor cateogrii de utilizatori: atat profesori, cat si studenti, fiind impartiti in doua categorii, fiecare fiind aleasa in cadrul paginii principale de autentificare, utilizand mail-urile institutionale primite de la secretariatul facultatii in momentul inrolarii. 
<b>1.Profesorii </b>– Acestia pot defini o activitate la o anumită dată, avand o descriere și un cod unic de acces la activitate pe care il utilizeaza studentii, activitate ce poate fi accesată pentru o durată prestabilită de timp. Ei pot vedea feedback-ul anonim continuu cu momentele de timp asociate,  fiind accesibil atât în timpul activității cât și ulterior.
<b>2.Studentii </b>– tipul de utilizator care are acces la interfata pentru transmiterea feedback-ului, împarțită în 4 cadrane, fiecare cu un emoticon (smiley face, frowny face, surprised face, confused face). Se pot adauga oricand un numar nelimitat de instante a feedback-ului, accesand cursul prin codul aferent acestuia (valabil pe durata activitatii), capatat de la profesorul care il sustine. 

<h2>Produse similare existente pe piata</h2>
O aplicatie similara o constituie cea a CSIE, utilizata in fiecare semestru de studenti pentru a oferi feedback profesorilor: http://campus-virtual.ase.ro/Evaluare_ASE/index.asp.
De asemenea, cei de la SISC (Sindicatul Studentilor din Cibernetica) au implementat o aplicatie pentru orar (https://orar.sisc.ro/csie/grupa), ce confera posibilitatea de a transmite feedback cu privire la infrmatiile de pe site, putand integra diverse sugestii sau reclamatii.
Alte aplicatii din domenii distincte sunt: Discord, ce implementeaza chiar ideea de feedback prin emoticoane. Dupa selectarea unui emoticon, utilizatorului i se solicita si o descriere textuala a justificarii optiunii alese. Un alt produs similar este si Waze, in care utilizatorii pot oferi informatii extra cu privire la traseul urmat, necesare celorlalti participanti la trafic, sau chiar si Instabug, un instrument mobil de feedback ce faciliteaza comunicarea dintre utilizator si organizatie, prin adnotari de capturi de ecran, note vocale, inregistrare pe ecran, profiluri de utilizator, inregistrare in retea si integrari terta parte.

<h2>Descrierea detaliata a functionalitatilor</h2>
Profesorul creeaza o noua activitate, adaugandu-i nume, data si ora si generandu-i-se un cod unic de acces ce va fi stocat in baza de date. Dupa ce studentii se autentifica si participa la activitatea respectiva, vor avea posibilitatea de a oferi feedback, vizualizat in timp real de catre profesor. La finalul activitatii, se va afisa un ecran cu un rezumat detaliat al opiniilor. Acesta consta in categorisirea si numararea feedback-ului: cati studenti au participat, cati au oferit un anumit emoticon si ce mesaj au lasat ca justificare, salvandu-se ca un istoric . In calitate de student logat in activitate cu un cod de acces, va fi vizibil ecranul de acordare de feedback continuu anonim in timo real, ce contine emoticoanele cu optiune de click si sectiune de inserare a motivului ( tip selectie sau text liber).

<h2>Componentele si grafica ecranelor:</h2>
TODO 


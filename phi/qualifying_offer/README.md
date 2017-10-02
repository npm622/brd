# Welcome!

Thank you for considering me a worthy candidate for the Software Engineer role within the Phillies' Research & Development role.  I am excited to have a chance to showcase my skill-set that I believe would be an extremely valuable addition to any font office.  Feel free to reach back out to me at `npm622@yahoo.com` if you'd like to discuss anything further.  Thanks again!

### Required Question

> As a member of the Research and Development team, how would you decide whether a Minor League pitcher prospect is ready to be promoted to the Majors?

Please refer to [pitching-prospect](pitching-prospect.md) for my response.

### Candidate’s Choice Question

> What's the worst piece of open source software you've used, and why?

Please refer to [open-source](open-source.md) for my response.

---

> In baseball, a team can provide a departing free agent player with a qualifying offer1: a one-year contract whose monetary value is the average of the 125 highest salaries from the past season. The player is free to reject it and sign with any other team, but his new team will have to forfeit its top draft pick (excluding overall picks 1-10).  

> Use the provided dataset to write a program or application that determines the monetary value of the upcoming qualifying offer and displays the amount along with any other relevant information or visualizations to the user.

---

**Answer:**  
As of 11:03PM EST, the projected qualifying offer amount is: $16,771,394.14

---

My solution is self-contained in the single file found alongside this README as a Node.js program: [`index.js`](index.js).

> The below walkthrough will most easily be achieved with the use of [homebrew](https://brew.sh/).  Consider downloading it if you haven't already, simply run:

```cmd
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor
```

Make sure to setup your local environment first, the following should be available:

Program | Version | Brew
--- | --- | ---
[`git --version`](https://git-scm.com/book/id/v2/Getting-Started-Installing-Git) | `git version 2.14.1` | `brew install git`
[`node -v && npm -v`](https://nodejs.org/en/download/) | `v8.1.2` && `5.3.0` | `brew install node`

##### Pull down source code

Clone the repository:

```cmd
git clone git@github.com:npm622/brd.git
```

Navigate to the repository and install the dependencies:

```cmd
cd brd/phi/qualifying_offer/ && npm install
```

##### running `index.js`

Once that's complete, you are now able to execute the program and view its results:

```cmd
node index.js
```

If you'd like to configure the program output further, the following parameters are available for customization:

Flag | Name | Description
--- | --- | ---
`-t` | `--threshold` | specify number of top contracts to average for qualifying offer amount [ default: 125 ]
`-f` | `--frequency` | specify number of data points to return representing a salary frequency chart (-1 for all)
`-r` | `--raw-data` | specify number of data points to return of raw data (-1 for all)

For complete output, try:

```cmd
node index.js -f -1 -r -1
```

To adjust the pool size of contracts averaged to determine the qualifying offer, try:

```cmd
node index.js -t 150
```

##### interpreting `index.js`

status info:

```cmd
{ threshold: 150, frequency: 125, rawData: 125 } // supplied configuration
fetching player salaries from: https://questionnaire-148920.appspot.com/swe/ // verifying data endpoint
... // http response completed
needed 150 salaries, found 1208 // playback of qualifying offer minimum threshold and total result set size
```

qualifying offer amount:

```cmd
--------
the projected qualifying offer is: $15,392,074.48
--------
```

not all players returned in the response have salary information available:

```cmd
players with missing salaries:
	- Campos Vicente
	- Jankowski Travis
	- Ray Robbie
	- Mariot Michael
	- Gordon Dee
	- Kershaw Clayton
	- Sanchez Carlos
	- De Los Santos Abel
```

in a future iteration of this product, this would serve as the dataset for a simple histogram of salary amounts:

```cmd
salary frequencies (top 125):
	( $34,571,429.00, 1 )
	( $34,000,000.00, 1 )
	( $30,000,000.00, 1 )
	( $28,410,000.00, 1 )
	( $28,000,000.00, 2 )
	( $25,857,143.00, 1 )
	( $25,000,000.00, 4 )
	( $24,000,000.00, 2 )
	( $23,500,000.00, 1 )
	( $23,125,000.00, 1 )
	( $23,000,000.00, 1 )
	( $22,750,000.00, 1 )
	( $22,142,857.00, 1 )
	( $22,125,000.00, 1 )
	( $22,000,000.00, 2 )
	( $21,857,143.00, 1 )
	( $21,750,000.00, 1 )
	( $21,607,143.00, 1 )
	( $21,571,429.00, 1 )
	( $21,142,857.00, 1 )
	( $21,118,782.00, 1 )
	( $21,000,000.00, 2 )
	( $20,833,333.00, 2 )
	( $20,777,777.00, 1 )
	( $20,500,000.00, 1 )
	( $20,200,000.00, 1 )
	( $20,125,000.00, 1 )
	( $20,000,000.00, 5 )
	( $19,500,000.00, 1 )
	( $18,500,000.00, 1 )
	( $18,000,000.00, 5 )
	( $17,600,000.00, 1 )
	( $17,500,000.00, 1 )
	( $17,428,571.00, 1 )
	( $17,000,000.00, 2 )
	( $16,800,000.00, 1 )
	( $16,333,333.00, 1 )
	( $16,083,333.00, 1 )
	( $16,050,000.00, 1 )
	( $16,000,000.00, 3 )
	( $15,833,333.00, 1 )
	( $15,800,000.00, 3 )
	( $15,750,000.00, 1 )
	( $15,250,000.00, 1 )
	( $15,000,000.00, 4 )
	( $14,250,000.00, 1 )
	( $14,200,000.00, 1 )
	( $14,000,000.00, 6 )
	( $13,666,667.00, 1 )
	( $13,500,000.00, 2 )
	( $13,208,333.00, 1 )
	( $13,200,000.00, 1 )
	( $13,125,000.00, 1 )
	( $13,000,000.00, 6 )
	( $12,666,667.00, 1 )
	( $12,541,667.00, 1 )
	( $12,500,000.00, 5 )
	( $12,359,375.00, 1 )
	( $12,100,000.00, 2 )
	( $12,000,000.00, 5 )
	( $11,666,667.00, 2 )
	( $11,650,000.00, 1 )
	( $11,500,000.00, 2 )
	( $11,325,000.00, 1 )
	( $11,271,429.00, 1 )
	( $11,250,000.00, 2 )
	( $11,000,000.00, 6 )
	( $10,800,000.00, 1 )
	( $10,700,000.00, 1 )
	( $10,650,000.00, 1 )
	( $10,550,000.00, 1 )
	( $10,500,000.00, 1 )
	( $10,400,000.00, 1 )
	( $10,000,000.00, 5 )
```

and for good measure, the parsed html data:

```cmd
raw salary data (top 125):
	( 'Kershaw Clayton', $34,571,429.00 )
	( 'Greinke Zack', $34,000,000.00 )
	( 'Price David', $30,000,000.00 )
	( 'Hamilton Josh', $28,410,000.00 )
	( 'Verlander Justin', $28,000,000.00 )
	( 'Cabrera Miguel', $28,000,000.00 )
	( 'Hernandez Felix', $25,857,143.00 )
	( 'Lester Jon', $25,000,000.00 )
	( 'Pujols Albert', $25,000,000.00 )
	( 'Howard Ryan', $25,000,000.00 )
	( 'Sabathia CC', $25,000,000.00 )
	( 'Cano Robinson', $24,000,000.00 )
	( 'Fielder Prince', $24,000,000.00 )
	( 'Hamels Cole', $23,500,000.00 )
	( 'Teixeira Mark', $23,125,000.00 )
	( 'Mauer Joe', $23,000,000.00 )
	( 'Ramirez Hanley', $22,750,000.00 )
	( 'Scherzer Max', $22,142,857.00 )
	( 'Upton Justin', $22,125,000.00 )
	( 'Reyes Jose', $22,000,000.00 )
	( 'Tanaka Masahiro', $22,000,000.00 )
	( 'Gonzalez Adrian', $21,857,143.00 )
	( 'Kemp Matt', $21,750,000.00 )
	( 'Crawford Carl', $21,607,143.00 )
	( 'Werth Jayson', $21,571,429.00 )
	( 'Ellsbury Jacoby', $21,142,857.00 )
	( 'Davis Chris', $21,118,782.00 )
	( 'Rodriguez Alex', $21,000,000.00 )
	( 'Shields James', $21,000,000.00 )
	( 'Cespedes Yoenis', $20,833,333.00 )
	( 'Cain Matt', $20,833,333.00 )
	( 'Posey Buster', $20,777,777.00 )
	( 'Wilson C.J.', $20,500,000.00 )
	( 'Weaver Jered', $20,200,000.00 )
	( 'Porcello Rick', $20,125,000.00 )
	( 'Choo Shin-Soo', $20,000,000.00 )
	( 'Tulowitzki Troy', $20,000,000.00 )
	( 'Votto Joey', $20,000,000.00 )
	( 'Braun Ryan', $20,000,000.00 )
	( 'Wright David', $20,000,000.00 )
	( 'Wainwright Adam', $19,500,000.00 )
	( 'Pence Hunter', $18,500,000.00 )
	( 'Zimmermann Jordan', $18,000,000.00 )
	( 'Bailey Homer', $18,000,000.00 )
	( 'Martinez Victor', $18,000,000.00 )
	( 'Beltre Adrian', $18,000,000.00 )
	( 'Ethier Andre', $18,000,000.00 )
	( 'Sandoval Pablo', $17,600,000.00 )
	( 'Heyward Jason', $17,500,000.00 )
	( 'Gonzalez Carlos', $17,428,571.00 )
	( 'Holliday Matt', $17,000,000.00 )
	( 'McCann Brian', $17,000,000.00 )
	( 'Sanchez Anibal', $16,800,000.00 )
	( 'Jones Adam', $16,333,333.00 )
	( 'Trout Mike', $16,083,333.00 )
	( 'Upton Melvin Jr.', $16,050,000.00 )
	( 'Granderson Curtis', $16,000,000.00 )
	( 'Lackey John', $16,000,000.00 )
	( 'Ortiz David', $16,000,000.00 )
	( 'Cueto Johnny', $15,833,333.00 )
	( 'Anderson Brett', $15,800,000.00 )
	( 'Wieters Matt', $15,800,000.00 )
	( 'Rasmus Colby', $15,800,000.00 )
	( 'Danks John', $15,750,000.00 )
	( 'Andrus Elvis', $15,250,000.00 )
	( 'Beltran Carlos', $15,000,000.00 )
	( 'Martin Russell', $15,000,000.00 )
	( 'Swisher Nick', $15,000,000.00 )
	( 'Peavy Jake', $15,000,000.00 )
	( 'Cruz Nelson', $14,250,000.00 )
	( 'Molina Yadier', $14,200,000.00 )
	( 'Zimmerman Ryan', $14,000,000.00 )
	( 'Montero Miguel', $14,000,000.00 )
	( 'Kinsler Ian', $14,000,000.00 )
	( 'Bautista Jose', $14,000,000.00 )
	( 'Bourn Michael', $14,000,000.00 )
	( 'Cabrera Melky', $14,000,000.00 )
	( 'Liriano Francisco', $13,666,667.00 )
	( 'Gardner Brett', $13,500,000.00 )
	( 'Santana Ervin', $13,500,000.00 )
	( 'McCutchen Andrew', $13,208,333.00 )
	( 'Harrison Matt', $13,200,000.00 )
	( 'Pedroia Dustin', $13,125,000.00 )
	( 'Buchholz Clay', $13,000,000.00 )
	( 'Jimenez Ubaldo', $13,000,000.00 )
	( 'Headley Chase', $13,000,000.00 )
	( 'Jackson Edwin', $13,000,000.00 )
	( 'Phillips Brandon', $13,000,000.00 )
	( 'LaRoche Adam', $13,000,000.00 )
	( 'Kazmir Scott', $12,666,667.00 )
	( 'Bruce Jay', $12,541,667.00 )
	( 'De La Rosa Jorge', $12,500,000.00 )
	( 'Garza Matt', $12,500,000.00 )
	( 'Peralta Jhonny', $12,500,000.00 )
	( 'McCarthy Brandon', $12,500,000.00 )
	( 'Hardy J.J.', $12,500,000.00 )
	( 'Freeman Freddie', $12,359,375.00 )
	( 'Gonzalez Gio', $12,100,000.00 )
	( 'Longoria Evan', $12,100,000.00 )
	( 'Gordon Alex', $12,000,000.00 )
	( 'Leake Mike', $12,000,000.00 )
	( 'Dickey R.A.', $12,000,000.00 )
	( 'Hill Aaron', $12,000,000.00 )
	( 'Nolasco Ricky', $12,000,000.00 )
	( 'Butler Billy', $11,666,667.00 )
	( 'Abreu Jose', $11,666,667.00 )
	( 'Donaldson Josh', $11,650,000.00 )
	( 'Estrada Marco', $11,500,000.00 )
	( 'Garcia Jaime', $11,500,000.00 )
	( 'Chapman Aroldis', $11,325,000.00 )
	( 'Castillo Rusney', $11,271,429.00 )
	( 'Pagan Angel', $11,250,000.00 )
	( 'Kimbrel Craig', $11,250,000.00 )
	( 'Papelbon Jonathan', $11,000,000.00 )
	( 'Prado Martin', $11,000,000.00 )
	( 'Markakis Nick', $11,000,000.00 )
	( 'Robertson David', $11,000,000.00 )
	( 'Crisp Covelli', $11,000,000.00 )
	( 'Iwakuma Hisashi', $11,000,000.00 )
	( 'Samardzija Jeff', $10,800,000.00 )
	( 'Arrieta Jake', $10,700,000.00 )
	( 'Jansen Kenley', $10,650,000.00 )
	( 'Walker Neil', $10,550,000.00 )
	( 'Zobrist Ben', $10,500,000.00 )
	( 'Strasburg Stephen', $10,400,000.00 )
```

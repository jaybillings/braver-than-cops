export default class BraverThanCops {
  constructor(nounList, adjList) {
    this.nounList = nounList;
    this.adjList = adjList;
    this.liveAccounts = [];
  }

  print() {
    return this.generateTweet();
  }

  generateTweet() {
    if (!this.liveAccounts.length) {
      // Fetch more accounts
      this.liveAccounts = this.fetchLiveAccounts();
    }

    return `${this.generateAdjs()} ${this.generateSubject()} are braver than the ${this.fetchAccount()}.`;
  }

  generateSubject() {
    const randNum = this.getRandomIntInclusive(0, this.nounList.length - 1);
    return this.nounList[randNum];
  }

  generateAdjs() {
    const numAdjs = this.getRandomIntInclusive(1, 6);
    let adjCount = numAdjs <= 3 ? 1 : (numAdjs <= 5 ? 2 : 3);
    let adjList = [];

    for (let i = 0; i < adjCount; i++) {
      let rand = this.getRandomIntInclusive(0, this.adjList.length - 1);
      let adj = this.adjList[rand];

      if (adjList.includes(adj)) i -= 1;
      else {
        if (i === 0) {
          let adjAsArr = adj.split('');
          adjAsArr[0] = adjAsArr[0].toUpperCase();
          adj = adjAsArr.join('');
        }
        adjList.push(adj);
      }
    }

    return adjList.join(" ");
  }

  fetchAccount() {
    const accounts = [{id: 1234, handle: '@Seattle_PD'}, {id: 827372, handle: '@NYPD'}, {id: 18292, handle: '@Portland_PD'}, {id: 19280, handle: '@LAPD'}];
    const rand = this.getRandomIntInclusive(0, Object.keys(accounts).length - 1);

    return accounts[rand].handle;
  }

  fetchLiveAccounts() {
    const params = {
      q: encodeURIComponent('police department official'),
      count: 20,
      include_entities: false
    };

    this.getFromAPI(params).then(result => {
      console.log(result);
    });
  }

  async getFromAPI(params) {
    const response = await fetch(`https://api.twitter.com/1.1/users/search.json?${this.objToDataString(params)}`, {mode: "cors"});
    return response.json();
  }

  objToDataString(data) {
    return Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}





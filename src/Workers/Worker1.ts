self.onmessage = e => {
        let temp: any = {};
        let wefAttack: any = {};
        let theReturn: any = [];
        let pu = new privateUtil();
        temp.originalAmount = e.data[0]; // originalAmount;
        temp.originalDollar = e.data[1]; // originalDollar;
        temp.currentValue = e.data[2]; // currentValue;
        let years = e.data[3];
        let perc = e.data[4];
        wefAttack.originalAmount = 100;
        wefAttack.currentValue = 100;
        wefAttack.additionalPercent = .15;
        let orig = 100.00;
        for (let i = 0; i < years; i++) {
            if ((i % 6 === 0) && i >= 3) {
                temp = pu.percent(['p', temp.currentValue, temp.currentValue, .10, true]);
                theReturn.push(temp);
            }
            if ((i % 12 === 0) && i > 3) {
                if (wefAttack.currentValue > 0) {
                    wefAttack = pu.percent(['p', wefAttack.currentValue,
                        temp.currentValue, wefAttack.additionalPercent, false]);
                    wefAttack.additionalPercent = .15;
                    theReturn.push('attack');
                    temp = pu.percent(['p', temp.currentValue, temp.currentValue, wefAttack.additionalPercent, false]);
                        let cont = (
                          temp.originalAmount.toString() + ' : ' +
                          temp.originalDollar.toString() + ' : ' + temp.delta.toString() + ' : ' + temp.currentValue.toString());
                        let conw = wefAttack.originalAmount.toString() + ': ' +
                          wefAttack.originalDollar.toString() + '  :  ' +
                          wefAttack.delta.toString() + ' : ' +
                          wefAttack.currentValue.toString() + '  : ' +
                          wefAttack.negativeOverFlowAmount.toString();
                        theReturn.push('Ass:  ' + cont);
                        theReturn.push('WEF:  ' + conw);

                    if (wefAttack.negativeOverFlowAmount > 0) {
                        theReturn.push('******************************* Going to web Worker *******************************');
                        temp = pu.dollar(['d', temp.currentValue, wefAttack.negativeOverFlowAmount, true]);
                            theReturn.push(Date.now());
                            theReturn.push('***** WEB WORKER Adjusted after overflow from Wef attack WEB WORKER *****');
                            theReturn.push(temp.originalAmount.toString() + ' : ' + temp.originalDollar.toString() + ' : ' +
                            temp.delta.toString() + ' : ' + temp.currentValue.toString());


                    }
                }
            }
            temp = pu.percent(['p', temp.currentValue, temp.currentValue, perc, true]);

                let con = temp.originalAmount.toString() + ' :  ' +
                  temp.originalDollar.toString() + '  :  ' +
                  temp.delta.toString() + '  :  ' +
                  temp.currentValue.toString() + '   ';
                theReturn.push(i);
                theReturn.push(con);

        };
        theReturn.push(Date.now());
        theReturn.push('DONE!!!!!!!!!!!');
        postMessage(theReturn);
};
class privateUtil {
    constructor(){}
    dollar(e) {
    let originalAmount = e[1];
    let dollarAmount = e[2];
    let isPositive = e[3];
    let additionalDollar;
    if (e[4]) {
      additionalDollar = e[4];
    }
    if (typeof (additionalDollar) === 'undefined' || additionalDollar == null) {
      additionalDollar = 0;
    }
    let ret: any = {};
    ret.originalAmount = originalAmount;
    ret.originalDollar = dollarAmount;
    ret.additionalDollar = additionalDollar;
    ret.delta = dollarAmount + additionalDollar;
    if (isPositive) {
      ret.currentValue = parseFloat(ret.originalAmount.toString()) + parseFloat(ret.delta.toString());
    } else {
      ret.currentValue = parseFloat(ret.originalAmount.toString()) - parseFloat(ret.delta.toString());
      if (ret.currentValue < 0) {
        ret.negativeOverFlowAmount = Math.abs(ret.currentValue);
        ret.currentValue = 0;
      }
    }
    return ret;
    }
percent(e)  {
      let originalAmount = e[1];
      let calculationDollarAmount = e[2];
      let percentageAmount = e[3];
      let isPositive = e[4];
      let additionalDollar = e[5];
      let additionalPercent = e[6];
        if (typeof (additionalDollar) === 'undefined' || additionalDollar === null) {
            additionalDollar = 0;
        }
        if (typeof (additionalPercent) === 'undefined' || additionalPercent === null) {
            additionalPercent = 1;
        }
        let ret: any = {};
        ret.originalAmount = parseFloat(originalAmount.toString());
        ret.originalDollar = (calculationDollarAmount * percentageAmount);
        ret.additionalDollar = (additionalDollar * additionalPercent);
        ret.delta = parseFloat(ret.originalDollar.toString()) + parseFloat(ret.additionalDollar.toString());
        if (isPositive) {
            ret.currentValue = parseFloat(ret.originalAmount.toString()) + parseFloat(ret.delta.toString());
        }
        else {
            ret.currentValue = parseFloat(ret.originalAmount.toString()) - parseFloat(ret.delta.toString());
            if (ret.currentValue < 0) {
                ret.negativeOverFlowAmount = Math.abs(ret.currentValue);
                ret.currentValue = 0;
            }
        }
        if (typeof (ret.negativeOverFlowAmount) === 'undefined' || ret.negativeOverFlowAmount === null) {
            ret.negativeOverFlowAmount = 0;
        }
        return ret;
    };
}
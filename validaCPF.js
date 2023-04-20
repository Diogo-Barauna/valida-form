class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo',{
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, ''),
        });
    };
    confereSequencia(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }
    geraCpf(){
        const cpfParcial = this.cpfLimpo.slice(0,-2)
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);
        this.newCPF = cpfParcial + digito1 + digito2
        
    };
    static geraDigito(cpfParcial){
        let total = 0;
        let reverso = cpfParcial.length + 1;

        for(let stringNum of cpfParcial){
            total += reverso * Number(stringNum);
            reverso--;
        };
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    };
    valida(){
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.confereSequencia()) return false;
        this.geraCpf();
        return this.newCPF === this.cpfLimpo;
        
    };
};

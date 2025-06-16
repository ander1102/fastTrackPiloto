export function getDocName(doc: string): string {
    switch(doc){
        case 'acta': return "Acta Constitutiva"
        case 'rfc': return "RFC o Número de identificación Fiscal"
        case "ine": return "Identificación oficial"
        case "address": return "Comprobante de domicilio"
        case "representante1Poder": return "Poder Legal"
        case "representante1INE": return "Identificación oficial"
        case "representante2Poder": return "Poder Legal"
        case "representante2INE": return "Identificación oficial"
        case "representante3Poder": return "Poder Legal"
        case "representante3INE": return "Identificación oficial"
        case "representante4Poder": return "Poder Legal"
        case "representante4INE": return "Identificación oficial"
        default: return "otro"
    }
    
}
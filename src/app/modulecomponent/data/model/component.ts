export interface Component {
    data: ComponentData;
    kids: {
      has_economicareacode?: { 
        records: ComponentRecord[]; 
      }
    }
}
export interface ComponentData {
    renaultpartnumber: string;
    designation: string;
    TTA: string;
    TechnicalClassification: string;
    StrategicClassification: string;
    Unit: string;
}

export interface ComponentRecord {
    data?: Economicareacode;
    kids?: {
      has_price?: {
        records: KidRecord;
      }
    }
}

export interface Economicareacode {
    id_economicarea: number;
    economicareacode: string;
}

export interface KidRecord {
    data?: Price;
    kids?: KidRecord;
  }

export interface Price {
    Id_price: number;
    Unitprice: number;
    Phone: string;
  }
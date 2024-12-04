// { 
//     id: 1, 
//     name: "Koushik -- zsh -- 80x24",
//     active: true,
//     content: [{
//       "text": "Welcome to my portfolio",
//       "type": "text",
//       "color": "white"
//     },{
//       "text": "Type 'help' to get started",
//       "type": "text",
//       "color": "white"
//     }],
//     initialPosition: { x: 200, y: 300 },
//     initialSize: { width: 500, height: 200 }
//   }

type TabType  = {
    id: number;
    name: string;
    active: boolean;
    content: {
        text: string;
        type: string;
        color: string;
    }[];
    initialPosition: { x: number; y: number };
    initialSize: { width: number; height: number };
};

export default TabType;
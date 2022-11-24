import BlueCandy from './images/blue-candy.png'
import OrangeCandy from './images/orange-candy.png'
import PurpleCandy from './images/purple-candy.png'
import GreenCandy from './images/green-candy.png'
import RedCandy from './images/red-candy.png'
import YellowCandy from './images/yellow-candy.png'
import Blank from './images/blank.png'
import {useEffect, useState} from 'react'
import ScoreBoard from './components/ScoreBoard'

const width = 8;




const App = () =>{
  const [candyBeingDragged, setCandyBeingDragged] = useState(null)
  const [candyBeingReplaced, setCandyBeingReplaced] = useState(null)
  const [score, setScore] = useState(0)
  

  const [currentArrangedColors, setCurrentArrangedColors] = useState([])

  const checkForColumnOfFour = () => {
    for(let i = 0; i <= 47; i++){
      const column = [i, i + width, i + 2 * width, i+ 3* width ]
      const decidedColor = currentArrangedColors[i]
      const isBlank = currentArrangedColors[i] === Blank
      if(column.every((square)=> currentArrangedColors[square]=== decidedColor && !isBlank)){
        setScore((score)=> score + 4)
        column.forEach((square)=> currentArrangedColors[square] = Blank)
        return true
      }


    }
  }
  const checkForColumnOfFive = () => {
    for(let i = 0; i <= 47; i++){
      const column = [i, i + width, i + 2 * width, i+ 3* width, i+ 4*width ]
      const decidedColor = currentArrangedColors[i]
      const isBlank = currentArrangedColors[i] === Blank
      if(column.every((square)=> currentArrangedColors[square]=== decidedColor && !isBlank)){
        setScore((score)=> score + 5)
        column.forEach((square)=> currentArrangedColors[square] = Blank)
        return true
      }


    }
  }
  const checkForColumnOfThree = () => {
    for(let i = 0; i <= 47; i++){
      const column = [i, i + width, i + 2 * width ]
      const decidedColor = currentArrangedColors[i]
      const isBlank = currentArrangedColors[i] === Blank

      if(column.every((square)=> currentArrangedColors[square]=== decidedColor) && !isBlank){
        setScore((score)=> score + 3)
        column.forEach((square)=> currentArrangedColors[square] = Blank)
        return true
      }


    }
  }

  const checkForRowOfFour = () => {
    for(let i = 0; i < 64; i++){
      const rowOfThree = [i, i + 1, i + 2, i+3 ]
      const decidedColor = currentArrangedColors[i]
      const notValid = [5,13,21,29,37,45,53,61,6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
      const isBlank =  currentArrangedColors[i] === Blank
      if(notValid.includes(i))continue
      if(rowOfThree.every((square)=> currentArrangedColors[square]=== decidedColor) && !isBlank){
        setScore((score)=> score + 4)
        rowOfThree.forEach((square)=> currentArrangedColors[square] = Blank)
        return true
      }


    }
  }
  const checkForRowOfFive = () => {
    for(let i = 0; i < 64; i++){
      const rowOfThree = [i, i + 1, i + 2, i+3, i+4]
      const decidedColor = currentArrangedColors[i]
      const notValid = [4,12,20,28,36,44,52,60,5,13,21,29,37,45,53,61,6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
      const isBlank =  currentArrangedColors[i] === Blank
      if(notValid.includes(i))continue
      if(rowOfThree.every((square)=> currentArrangedColors[square]=== decidedColor) && !isBlank){
        setScore((score)=> score + 5)
        rowOfThree.forEach((square)=> currentArrangedColors[square] = Blank)
        return true
      }


    }
  }
  const checkForRowOfThree = () => {
    for(let i = 0; i < 64; i++){
      const rowOfThree = [i, i + 1, i + 2  ]
      const decidedColor = currentArrangedColors[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
      const isBlank = currentArrangedColors[i]=== Blank
      if(notValid.includes(i))continue
      if(rowOfThree.every((square)=> currentArrangedColors[square]=== decidedColor) && !isBlank){
        setScore((score)=> score + 3)
        rowOfThree.forEach((square)=> currentArrangedColors[square] = Blank)
        return true
      }


    }
  }
  // const candyColors = ['red', 'green', 'orange', 'blue', 'brown', 'yellow' ]
      const candyColors = [ BlueCandy, OrangeCandy, RedCandy, PurpleCandy, GreenCandy, YellowCandy    ]
  

  const createBoard = ()=>{
    
      const randomArrangedColors = []
      for(let i= 0; i < 64; i++){
          let random = Math.floor(Math.random() * candyColors.length)
          const colorsArray = candyColors[random] 
          randomArrangedColors.push(colorsArray)
      }
      setCurrentArrangedColors(randomArrangedColors)
      console.log(currentArrangedColors)
    }

    const moveIntoBelow = () =>{
      for(let i= 0; i < 55; i++){
        const firstRow = [0,1,2,3,4,5,6,7]
        const isFirstRow = firstRow.includes(i)
        if(currentArrangedColors[i] === Blank && isFirstRow){
          const randomNum = Math.floor(Math.random() * candyColors.length)
          currentArrangedColors[i] = candyColors[randomNum]
        }

        if(currentArrangedColors[i+ width] === Blank ){
          currentArrangedColors[i + width] = currentArrangedColors[i]
          currentArrangedColors[i] = Blank
        }

      }
    }
    const dragStart = (e) =>{
        setCandyBeingDragged(e.target)
        

    }
    

    const dragend = () =>{
      const candyBeingDraggedId = parseInt(candyBeingDragged.getAttribute('data-id'))
      const candyBeingReplacedId = parseInt(candyBeingReplaced.getAttribute('data-id'))
      currentArrangedColors[candyBeingReplacedId]= candyBeingDragged.getAttribute('src')
      currentArrangedColors[candyBeingDraggedId] = candyBeingReplaced.getAttribute('src')
      
      const validMoves = [
        candyBeingDraggedId - 1,
         candyBeingDraggedId + 1,
        candyBeingDraggedId + width,
         candyBeingDraggedId - width
      ]
      const validMove = validMoves.includes(candyBeingReplacedId)
      const isColumnFour = checkForColumnOfFour()
      const isColumnFive = checkForColumnOfFive()
      const isRowFour = checkForRowOfFour()
      const isRowFive = checkForRowOfFive()
      const isColumnThree = checkForColumnOfThree()
      const isRowThree = checkForRowOfThree()

      if( candyBeingDraggedId && validMove && 
        (isColumnFour || isColumnThree || isRowFour || isRowThree || isColumnFive || isRowFive)){
          setCandyBeingDragged(null)
          setCandyBeingReplaced(null)
        }else
        {
          currentArrangedColors[candyBeingDraggedId]= candyBeingDragged.getAttribute('src')
          currentArrangedColors[candyBeingReplacedId] = candyBeingReplaced.getAttribute('src')
        }
  }
    const drop = (e) =>{
      setCandyBeingReplaced(e.target)

    }


  useEffect(() => {
    createBoard()

  }, [])
  useEffect(()=>{
    const timer = setInterval(()=> {
      checkForColumnOfFive()
      checkForRowOfFive()
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoBelow()
      setCurrentArrangedColors([...currentArrangedColors])
    }, 100)
    return ()=> clearInterval(timer)
    
  },[checkForColumnOfThree, checkForRowOfThree, checkForColumnOfFour,
     checkForRowOfFour,moveIntoBelow, checkForColumnOfFive, checkForRowOfFive])





  return (<div className='app'>
            
            <div className='game'>
             {currentArrangedColors.map((candyColor, index)=> (
                <img 
                    data-id={index}
                    key={index}
                    alt={candyColor}
                    src={candyColor}
                    style={{backgroundColor:candyColor}}
                    onClick={()=> console.log(index)}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e)=> e.preventDefault()}
                    onDragEnter={(e)=> e.preventDefault()}
                    onDragLeave={(e)=> e.preventDefault()}
                    onDrop={drop}
                    onDragEnd={dragend}
                  />
             ))

             }

            </div>
            <ScoreBoard className="score" score={score}/>

          </div>

      )
    }


export default App


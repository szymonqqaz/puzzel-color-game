import { useEffect, useState } from "react";

import styled from "styled-components";

const HOW_BIG = 8;
const HOW_MANY_COLORS = 4;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const StyledRandomBoardContainer = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: auto 50px;
`;

const StyledRandomBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${HOW_BIG}, 100px);
  grid-template-rows: repeat(${HOW_BIG}, 100px);
`;

const handleColorType = (color) => {
  switch (color) {
    case 1:
      return "#FA7F08";
    case 2:
      return "#348888";
    case 3:
      return "#9EF8EE";
    case 4:
      return "#44803F";
    case 5:
      return "#FF5A33";
    case 6:
      return "#FFEC5C";
    case 7:
      return "#1C2621";
    case 8:
      return "#FF86AE";
    case null:
      return "white";
    default:
      return "white";
  }
};

const StyledBox = styled.div`
  background: ${({ color }) => handleColorType(color)};
  border: 2px solid black;
`;

const StyledRowColors = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledColumnColors = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const InsideColor = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ color }) => handleColorType(color)};
  cursor: pointer;
`;

function App() {
  const [randomBoard, setRandomBoard] = useState(null);
  const [randomColors, setRandomColors] = useState(null);

  const [myGameBoard, setMyGameBoard] = useState(
    Array.from({ length: HOW_BIG }, (_) =>
      Array.from({ length: HOW_BIG }, (_) => null),
    ),
  );
  const main = (howBig = 2, howManyColors = 2) => {
    const getRandomColors = () => {
      const randomColors = Array.from(
        { length: howBig * 2 },
        (_) => Math.floor(Math.random() * howManyColors) + 1,
      );
      let isPass = true;
      Array.from({ length: howManyColors }).forEach((_, i) => {
        if (!randomColors.some((e1) => e1 !== i + 1)) isPass = false;
      });
      if (isPass) {
        return randomColors;
      } else {
        getRandomColors();
      }
    };

    const random = getRandomColors();

    let result = Array.from({ length: howBig }, (_) =>
      Array.from({ length: howBig }),
    );
    const onPaint = (id, colorToChange) => {
      if (id < howBig) {
        result[id].fill(colorToChange);
      } else {
        const col = id - howBig;
        result = result.map((inArr) => {
          return inArr.map((prevColors, index) =>
            index === col ? colorToChange : prevColors,
          );
        });
      }
    };

    for (let i = 0; i < 1000; i++) {
      const randomClick = Math.floor(Math.random() * (howBig * howBig));
      onPaint(randomClick, random[randomClick]);
    }
    return [result, random];
  };

  const onPointBoard = (id, colorToChange) => {
    console.log(id);
    if (id < HOW_BIG) {
      setMyGameBoard((prev) => {
        let arr = prev;
        arr[id].fill(colorToChange);
        console.log(arr);
        return [...arr];
      });
    } else {
      const col = id - HOW_BIG;
      setMyGameBoard((prev) => {
        return prev.map((inArr) => {
          return inArr.map((prevColors, index) =>
            index === col ? colorToChange : prevColors,
          );
        });
      });
    }
  };

  useEffect(() => {
    const [result, randomColors] = main(HOW_BIG, HOW_MANY_COLORS);
    setRandomBoard(result);
    setRandomColors(randomColors);
  }, []);

  return (
    <>
      {randomBoard === null ? (
        "Ładowanie"
      ) : (
        <StyledContainer>
          <StyledRandomBoardContainer>
            <StyledRowColors>
              {randomColors.slice(0, HOW_BIG).map((e) => (
                <InsideColor color={e} />
              ))}
            </StyledRowColors>
            <StyledRandomBoard>
              {randomBoard.map((e) => e.map((e2) => <StyledBox color={e2} />))}
            </StyledRandomBoard>
            <span></span>
            <StyledColumnColors>
              {randomColors.slice(HOW_BIG, HOW_BIG * 2).map((e) => (
                <InsideColor color={e} />
              ))}
            </StyledColumnColors>
          </StyledRandomBoardContainer>
          <StyledRandomBoardContainer>
            <StyledRowColors>
              {randomColors.slice(0, HOW_BIG).map((e, i) => (
                <InsideColor color={e} onClick={() => onPointBoard(i, e)} />
              ))}
            </StyledRowColors>
            <StyledRandomBoard>
              {myGameBoard.map((e) => e.map((e2) => <StyledBox color={e2} />))}
            </StyledRandomBoard>
            <span></span>
            <StyledColumnColors>
              {randomColors.slice(HOW_BIG, HOW_BIG * 2).map((e, i) => (
                <InsideColor
                  color={e}
                  onClick={() => onPointBoard(i + HOW_BIG, e)}
                />
              ))}
            </StyledColumnColors>
          </StyledRandomBoardContainer>
          <h1>
            {JSON.stringify(randomBoard) === JSON.stringify(myGameBoard) &&
              "WIN!"}
          </h1>
        </StyledContainer>
      )}
    </>
  );
}

export default App;

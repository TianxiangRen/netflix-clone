/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./Row.css";
import axios from "../axios";
import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";
import PropTypes from "prop-types";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const base_url = "https://images.tmdb.org/t/p/original";

  const scrollDuration = 300;
  const leftPaddle = useRef(null);
  const rightPaddle = useRef(null);
  const poster = useRef(null);
  const posters = useRef(null);
  const poster_wrapper = useRef(null);
  const menu = useRef(null);
  let postersLength = 0;
  let posterSize = 0;
  const paddleMargin = 20;
  let menuWrapperSize = 0;
  let menuSize = 0;
  let menuInvisibleSize = 0;

  const getMenuWrapperSize = function () {
    return poster_wrapper.current?.offsetWidth;
  };

  const getMenuSize = function () {
    return posters.current?.scrollWidth;
  };

  const getMenuPosition = function () {
    return posters.current?.scrollLeft;
  };

  const getMenuInvisibleSize = function () {
    return posters?.current.scrollWidth - getMenuWrapperSize();
  };

  const onScroll = function () {
    const menuPosition = getMenuPosition();
    const menuEndOffset = getMenuSize();

    // console.log("MenuEndOffset is >>> ", menuEndOffset);

    if (menuPosition <= paddleMargin) {
      leftPaddle.current.classList.add("hidden");
      rightPaddle.current.classList.remove("hidden");
    } else if (menuPosition > 0 && menuPosition < getMenuInvisibleSize() - 30) {
      leftPaddle.current.classList.remove("hidden");
      rightPaddle.current.classList.remove("hidden");
    } else if (menuPosition > 0) {
      leftPaddle.current.classList.remove("hidden");
      rightPaddle.current.classList.add("hidden");
    }
  };

  const leftPaddleClick = function () {
    let scrollFactor = 3;
    if ((poster.current?.offsetWidth + 10) * 3 > window.innerWidth) {
      scrollFactor = 1;
    }
    const scrollAmount = (poster.current?.offsetWidth + 10) * scrollFactor;
    const scrollTo =
      getMenuPosition() - scrollAmount > 0
        ? getMenuPosition() - scrollAmount
        : 0;

    posters.current.scroll({ left: scrollTo, top: 0, behavior: "smooth" });
  };

  const rightPaddleClick = function () {
    let scrollFactor = 3;
    if ((poster.current?.offsetWidth + 10) * 3 > window.innerWidth) {
      scrollFactor = 1;
    }
    const scrollAmount = (poster.current?.offsetWidth + 10) * scrollFactor;
    const scrollTo =
      getMenuPosition() + scrollAmount <
      posters?.current.scrollWidth - getMenuWrapperSize()
        ? getMenuPosition() + scrollAmount
        : posters?.current.scrollWidth;
    posters.current.scroll({
      left: scrollTo,
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData().then(() => {
      // initialize variables
      postersLength = posters.current?.length;
      posterSize = poster.current?.offsetWidth;
      menuWrapperSize = getMenuWrapperSize();
      menuSize = getMenuSize();
      window.addEventListener("resize", () => {
        menuWrapperSize = getMenuWrapperSize();
      });
      menuInvisibleSize = menuSize - menuWrapperSize;
    });
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__wrapper" ref={poster_wrapper}>
        <div ref={posters} className="row__posters" onScroll={onScroll}>
          {movies?.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  ref={poster}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>

        <div className="row__paddles">
          <div
            ref={leftPaddle}
            className={`hidden row__paddle row__paddleLeft ${
              isLargeRow && "row__paddleLarge"
            }`}
          >
            <img src={leftArrow} onClick={leftPaddleClick}></img>
          </div>

          <div
            ref={rightPaddle}
            className={`row__paddle row__paddleRight ${
              isLargeRow && "row__paddleLarge"
            }`}
          >
            <img src={rightArrow} onClick={rightPaddleClick}></img>
          </div>
        </div>

        {/* <button
          ref={leftPaddle}
          onClick={leftPaddleClick}
          className={`row__leftPaddle hidden row__paddle ${
            isLargeRow && "row__largeButton"
          }`}
        >
          &lt;
        </button>
        <button
          ref={rightPaddle}
          onClick={rightPaddleClick}
          className={`row__rightPaddle row__paddle ${
            isLargeRow && "row__largeButton"
          }`}
        >
          &gt;
        </button> */}
      </div>
    </div>
  );
};

Row.propTypes = {
  title: PropTypes.string,
  fetchUrl: PropTypes.string,
  isLargeRow: PropTypes.bool,
};

export default Row;

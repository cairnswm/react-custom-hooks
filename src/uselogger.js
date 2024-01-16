import { useState, useEffect } from "react";

const useLogger = (
  loggingType,
  level = undefined
) => {
  const [loggingLevel, setLoggingLevel] = useState(level);
  const loggingPrefix = "[" + loggingType + "]";

  const loadLoggingLevel = () => {
      const config = JSON.parse(localStorage.getItem("logging"), "{}");
      if (config && config[loggingType]) {
        setLoggingLevel(config[loggingType]);
      } 
  }

  if (!loggingLevel) {
    loadLoggingLevel();
  }

  useEffect(() => {
    window.addEventListener('storage',loadLoggingLevel);
    return () => {
      window.removeEventListener('storage',loadLoggingLevel);
    }
  },[])


  function debug() {
    if (loggingLevel === "info" || loggingLevel === "debug" || loggingLevel === "log") {
      console.log(loggingPrefix, "[debug]", ...arguments);
    }
  }
  function info() {
    if (loggingLevel === "info" || loggingLevel === "debug" || loggingLevel === "log") {
      console.log(loggingPrefix, "[info]", ...arguments);
    }
  }
  function log() {
    if (loggingLevel === "log" || loggingLevel === "debug" || loggingLevel === "info") {
      console.log(loggingPrefix, ...arguments);
    }
  }
  function warn() {
    if (
      loggingLevel === "warn" ||
      loggingLevel === "log" || 
      loggingLevel === "debug" ||      
      loggingLevel === "info"
    ) {
      console.warn(loggingPrefix, ...arguments);
    }
  }
  function error() {
    if (
      loggingLevel === "error" ||
      loggingLevel === "warn" ||
      loggingLevel === "log" || 
      loggingLevel === "debug"  ||
      loggingLevel === "info"
    ) {
      console.error(loggingPrefix, ...arguments);
    }
  }

  const logger = {};
  logger.debug = debug;
  logger.info = info;
  logger.log = log;
  logger.warn = warn;
  logger.error = error;
  logger.assert = console.assert;
  logger.clear = console.clear;
  logger.count = console.count;
  logger.countReset = console.countReset;
  logger.debug = console.debug;
  logger.dir = console.dir;
  logger.dirxml = console.dirxml;
  logger.exception = console.exception;
  logger.group = console.group;
  logger.groupCollapsed = console.groupCollapsed;
  logger.groupEnd = console.groupEnd;
  logger.markTimeline = console.markTimeline;
  logger.profile = console.profile;
  logger.profileEnd = console.profileEnd;
  logger.JSON = console.JSON;
  logger.table = console.table;
  logger.time = console.time;
  logger.timeEnd = console.timeEnd;
  logger.timeLog = console.timeLog;
  logger.timeStamp = console.timeStamp;
  logger.trace = console.trace;
  logger.timeline = console.timeline;
  logger.timelineEnd = console.timelineEnd;
  logger.timeStamp = console.timeStamp;

  return { logger, log, warn, error };
};

export default useLogger;

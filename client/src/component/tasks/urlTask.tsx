import React, { useEffect } from "react";

const UrlTask = () => {
  let dee = {
    type: "radialGauge",
    data: {
      datasets: [
        {
          data: [80],
          // backgroundColor: getGradientFillHelper('horizontal', ['red', 'blue']),
        },
      ],
    },
    options: {
      // See https://github.com/pandameister/chartjs-chart-radial-gauge#options
      domain: [0, 100],
      trackColor: "#f0f8ff",
      centerPercentage: 90,
      centerArea: {
        text: (val: any) => val + "%",
      },
    },
  };

  return (
    <iframe
      src={`https://quickchart.io/chart?w=480&bkg=%23aacf4e&c=https://github.com/pandameister/chartjs-chart-radial-gauge#options`}
    ></iframe>
  );
};

export default UrlTask;
// return (
//     <>
//     <Box
//   sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
// >
//     <Box>
//       <Typography
//         sx={{
//           fontSize: 26,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//         color="text.secondary"
//         gutterBottom
//       >
//         {"משימות שבוצעו:"}
//       </Typography>
//       {task && (
//         <iframe
//           src={`https://quickchart.io/chart?w=300&h=40&c=${JSON.stringify(
//             dataUrl
//           )}`}
//           style={{ border: "0", width: 600, height: 80 }}
//           title="Iframe Example"
//         ></iframe>
//       )}
//       </Box>
//       </Box>
//     </>
//   );
// };
// export default Api;

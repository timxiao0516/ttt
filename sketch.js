/* MoveNet Skeleton - Steve's Makerspace (most of this code is from TensorFlow)

MoveNet is developed by TensorFlow:
https://www.tensorflow.org/hub/tutorials/movenet

*/

let video, bodypose, pose, keypoint, detector; // 定義變量
let poses = [];
let img; // 用於存放您的物件圖片
let studentID = "412730987"; // 學號
let studentName = "蕭詠錠"; // 姓名

// 初始化MoveNet檢測器
async function init() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );
}

// 當視頻準備好時調用
async function videoReady() {
  console.log("video ready");
  await getPoses();
}

// 獲取姿勢數據
async function getPoses() {
  if (detector) {
    poses = await detector.estimatePoses(video.elt, {
      maxPoses: 2,
      //flipHorizontal: true,
    });
  }
  requestAnimationFrame(getPoses);
}

// 設置畫布和視頻
async function setup() {
  createCanvas(640, 480); // 創建畫布
  video = createCapture(VIDEO, videoReady); // 捕捉視頻
  video.size(width, height); // 設置視頻尺寸
  video.hide(); // 隱藏視頻元素
  await init(); // 初始化檢測器
  
  img = loadImage('upload_f887fd0cb29f9d086fb4d63b754f6d79.gif'); // 加載您的物件圖片
  
  stroke(255); // 設置筆觸顏色為白色
  strokeWeight(5); // 設置筆觸寬度為5
}

// 繪製每一幀
function draw() {
  image(video, 0, 0); // 繪製視頻到畫布上
  drawSkeleton(); // 繪製骨架
  // 水平翻轉圖像
  cam = get();
  translate(cam.width, 0);
  scale(-1, 1);
  image(cam, 0, 0);
}



    // 在眼睛位置繪製物件圖片
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    if (leftEye.score > 0.1) {
      image(img, leftEye.x - 25, leftEye.y - 25, 50, 50); // 繪製圖片
    }
    if (rightEye.score > 0.1) {
      image(img, rightEye.x - 25, rightEye.y - 25, 50, 50); // 繪製圖片
    }

    // 在肩膀位置繪製物件圖片
    let leftwrist = pose.keypoints[j];
    let rightwrist = pose.keypoints[j+2];
    if (leftShoulder.score > 0.1) {
      image(img, leftwrist.x - 25, leftwrist.y - 45, 50, 50); // 繪製圖片
    }
    if (rightShoulder.score > 0.1) {
      image(img, rightwrist.x - 25, rightwrist.y - 45, 50, 50); // 繪製圖片
    }

    // 在頭頂上方顯示學號和姓名
    let nose = pose.keypoints[0];
    if (nose.score > 0.1) {
      fill(255, 0, 0); // 設置填充顏色為紅色
      textSize(20); // 設置文字大小為20
      textAlign(CENTER); // 設置文字對齊方式為中心對齊
      text(`${studentID} ${studentName}`, nose.x, nose.y - 50); // 顯示學號和姓名
    }

   
      
    
  


/* Points (view on left of screen = left part - when mirrored)
  0 nose
  1 left eye
  2 right eye
  3 left ear
  4 right ear
  5 left shoulder
  6 right shoulder
  7 left elbow
  8 right elbow
  9 left wrist
  10 right wrist
  11 left hip
  12 right hip
  13 left knee
  14 right knee
  15 left foot
  16 right foot
*/

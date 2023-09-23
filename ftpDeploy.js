const path = require("path");
const fs = require("fs");
const SftpClient = require("ssh2-sftp-client");

const config = {
  host: "52.192.47.46",
  port: 22,
  username: "ubuntu",
  privateKey: fs.readFileSync(
    "/Users/gualin/Documents/Work/cityofwins",
    "utf8"
  ),
};

const sftp = new SftpClient();

const localPath = path.join(__dirname, "build");
const remotePath = "/var/www/html/newback/public";

async function deleteRemoteFiles(localPath, remotePath) {
  try {
    const files = fs.readdirSync(localPath, { withFileTypes: true });
    for (const file of files) {
      const localFilePath = path.join(localPath, file.name);
      const remoteFilePath = path.join(remotePath, file.name);

      if (file.isDirectory()) {
        if (file.name === "static") {
          await deleteStaticSubfolders(localFilePath, remoteFilePath);
        } else {
          await deleteRemoteFiles(localFilePath, remoteFilePath);
        }
      }
    }
  } catch (err) {
    console.error(`Failed to delete files in ${remotePath}: ${err.message}`);
  }
}

async function deleteStaticSubfolders(localPath, remotePath) {
  try {
    const files = fs.readdirSync(localPath, { withFileTypes: true });
    for (const file of files) {
      const localFilePath = path.join(localPath, file.name);
      const remoteFilePath = path.join(remotePath, file.name);

      if (file.isDirectory() && (file.name === "js" || file.name === "css")) {
        await sftp.rmdir(remoteFilePath, true);
      }
    }
  } catch (err) {
    console.error(
      `Failed to delete subfolders in ${remotePath}: ${err.message}`
    );
  }
}

sftp
  .connect(config)
  .then(async () => {
    await deleteRemoteFiles(localPath, remotePath);
  })
  .then(() => {
    return sftp.uploadDir(localPath, remotePath);
  })
  .then(() => {
    const remoteIndexPath = path.join(remotePath, "index.html");
    return sftp.delete(remoteIndexPath);
  })
  .then(() => {
    console.log("Upload completed");
    return sftp.end();
  })
  .catch((err) => {
    console.error(err.message);
  });

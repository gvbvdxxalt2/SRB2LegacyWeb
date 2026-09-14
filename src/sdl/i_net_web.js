mergeInto(LibraryManager.library, {
  SRB2_InitNetwork: function () {
    if (window.SRB2WebNet && window.SRB2WebNet.InitNetwork) {
      return window.SRB2WebNet.InitNetwork();
    }
    return 1;
  },
  SRB2_NetworkSend: function (node_id, data_ptr, len) {
    if (window.SRB2WebNet && window.SRB2WebNet.SendPacket) {
      return window.SRB2WebNet.SendPacket(node_id, data_ptr, len);
    }
    return 1;
  },
  SRB2_ListenOn: function (port) {
    if (window.SRB2WebNet && window.SRB2WebNet.ListenOn) {
      return window.SRB2WebNet.ListenOn(port);
    }
    return 1;
  },
  SRB2_ConnectTo: function (addr, port) {
    if (window.SRB2WebNet && window.SRB2WebNet.ConnectTo) {
      return window.SRB2WebNet.ConnectTo(UTF8ToString(addr), UTF8ToString(port));
    }
    return 1;
  },
  SRB2_CloseSocket: function () {
    if (window.SRB2WebNet && window.SRB2WebNet.CloseSocket) {
      return window.SRB2WebNet.CloseSocket();
    }
    return 1;
  },
  SRB2_GetPort: function () {
    if (window.SRB2WebNet && window.SRB2WebNet.GetPort) {
      return window.SRB2WebNet.GetPort();
    }
    return 5029; // Default port
  },


  //This is a bit off topic to this file, but it works here anyways.
  SRB2_VideoResolutionInfo: function (width,height) {
    if (window.SRB2HandleVideoResolution) {
      window.SRB2HandleVideoResolution(width,height);
    }
  }
});
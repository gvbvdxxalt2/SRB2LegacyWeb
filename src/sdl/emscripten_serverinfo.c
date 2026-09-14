//Used to pass in server info for the relay server in SRB2 web.
//Simple c script created by gvbvdxx.

#ifdef EMSCRIPTEN
#include <emscripten.h>

#include "../g_game.h"
#include "../doomstat.h"
#include "../doomdef.h"
#include "../command.h"
#include "../i_threads.h"
#include "../m_menu.h"
#include "../z_zone.h"
#include "../mserv.h"
#include "../d_clisrv.h"

extern void SRB2_ServerInfoResponse(
    char *name,
    int *maxPlayers,
    char *map,
    char *map_title,
    INT32 ingame_players,
    char *playerNameList
);

EMSCRIPTEN_KEEPALIVE
void SRB2_GetServerInfo(void)
{

    static char playerListBuffer[4000]; 
    playerListBuffer[0] = '\0';

    int playerCount = 0;
    int i;

    for (i = 0; i < MAXPLAYERS; i++)
    {
        if (playeringame[i])
        {
            playerCount++;

            if (playerListBuffer[0] != '\0')
            {
                strcat(playerListBuffer, "\n");
            }
            
            strncat(playerListBuffer, player_names[i], 24);
        }
    }

    SRB2_ServerInfoResponse(
        (char *)cv_servername.string,
        (int *)cv_maxplayers.value,
        G_BuildMapName(gamemap),
        G_BuildMapTitle(gamemap),
        D_NumPlayers(),
        playerListBuffer
    );
}
#endif
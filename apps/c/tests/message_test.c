#include "../src/message.h"
#include <assert.h>
#include <string.h>

int main(void) {
    assert(strcmp(starter_message(), "Hello from Starter Kit C app") == 0);
    return 0;
}

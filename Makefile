install-emsdk:
	./install-emsdk.sh

install-hts_engine_API:
	./install-hts_engine_API.sh

install-open_jtalk:
	./install-open_jtalk.sh

clean-emsdk:
	rm -rf tools/emsdk/

clean-hts_engine_API:
	rm -rf tools/hts_engine_API/

clean-open_jtalk:
	rm -rf tools/open_jtalk/

clean:
	make clean-emsdk
	make clean-hts_engine_API
	make clean-open_jtalk
